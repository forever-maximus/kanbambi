var express = require('express');
var models = require('../models');
var wss = require('../websocket/websocket');
const eventTypes = require('../websocket/ws_eventTypes');
var router = express.Router();

router.use(express.json());

// Create new task
router.post('/', (req, res) => {
  if (!('title' in req.body.task)) {
    res.status(400).json({error: "Missing required field 'title'"});
  } else if (!('description' in req.body.task)) {
    res.status(400).json({error: "Missing required field 'description'"});
  } else if (!('stateColumnId' in req.body.task)) {
    res.status(400).json({error: "Missing required field 'stateColumnId'"});
  } else if (!('order' in req.body.task)) {
    res.status(400).json({error: "Missing required field 'order'"});
  } else {
    models.task.create({
      title: req.body.task.title,
      description: req.body.task.description,
      stateColumnId: req.body.task.stateColumnId,
      order: req.body.task.order,
    }).then(task => {
      res.status(201).json({task: task});
      wss.updateOtherClients(req.body.clientId, req.body.boardId, task, eventTypes.createTask);
    });
  }
});

// Request to update a task - check what type required
router.patch('/:id', (req, res) => {
  const prevOrder = req.query.prevOrder;
  const prevStateCol = req.query.prevStateCol;

  if (prevStateCol !== undefined && prevOrder !== undefined) {
    changeTaskState(req, res, prevOrder, prevStateCol)
  } else if (prevOrder !== undefined) {
    reorderTasks(req, res, prevOrder);
  } else {
    updateTask(req, res, eventTypes.updateTask);
  }
});

// Handle moving task from one state column to another
function changeTaskState(req, res, prevOrder, prevStateCol) {
  const details = {
    prevOrder: prevOrder - 1,
    prevStateCol: prevStateCol
  };
  // TODO: put this in a transaction
  // Decrement the order of tasks in the old state column with greater order than the task being removed
  return models.task.decrement('order', {
    where: {
      order: {
        $gt: prevOrder
      },
      stateColumnId: prevStateCol
    }
  }).then(() => {
    // Increment order of tasks in new state column with greater or 
    // equal order than where new task is inserted into
    models.task.increment('order', {
      where: {
        order: {
          $gte: req.body.task.order
        },
        stateColumnId: req.body.task.stateColumnId
      },
    }).then(() => {
      // Lastly apply updates to the task that was changing state column
      updateTask(req, res, eventTypes.changeTaskState, details);
    });
  });
}

// Handle reordering tasks within a column
function reorderTasks(req, res, prevOrder) {
  const details = {prevOrder: prevOrder - 1};
  // TODO: put this in a transaction
  if (prevOrder > req.body.task.order) {
    // Order has moved lower in the column
    return models.task.increment('order', { 
      where: { 
        order: {
          $lt: prevOrder,
          $gte: req.body.task.order
        },
        stateColumnId: req.body.task.stateColumnId
      }
    }).then(() => {
      updateTask(req, res, eventTypes.reorderTask, details);
    });
  }

  // Order has moved higher in the column
  return models.task.decrement('order', { 
    where: { 
      order: {
        $lte: req.body.task.order,
        $gt: prevOrder
      },
      stateColumnId: req.body.task.stateColumnId
    }
  }).then(() => {
    updateTask(req, res, eventTypes.reorderTask, details);
  });
}

// Update task
function updateTask(req, res, eventType, details = {}) {
  return models.task.update(req.body.task, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({task: req.body.task});
    wss.updateOtherClients(req.body.clientId, req.body.boardId, req.body.task, eventType, details);
  });
}

// Add label to a task
router.patch('/:taskId/labels/:labelId', (req, res) => {
  models.task.findByPk(req.params.taskId).then(task => {
    task.addLabel(req.params.labelId).then(taskLabel => {
      res.status(200).json({taskLabel: taskLabel});
      const data = {
        taskId: req.params.taskId,
        labelId: req.params.labelId
      }
      wss.updateOtherClients(req.body.clientId, req.body.boardId, data, eventTypes.addTaskLabel);
    });
  });
});

// Remove label from a task
router.delete('/:taskId/labels/:labelId', (req,res) => {
  const clientId = req.query.clientId;
  const boardId = req.query.boardId;

  models.task.findByPk(req.params.taskId).then(task => {
    task.removeLabel(req.params.labelId).then(() => {
      res.status(204).send();
      const data = {
        taskId: req.params.taskId,
        labelId: req.params.labelId
      }
      wss.updateOtherClients(clientId, boardId, data, eventTypes.removeTaskLabel);
    });
  });
});

module.exports = router;