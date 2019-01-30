var express = require('express');
var models = require('../models');
var wss = require('../websocket/websocket');
const eventTypes = require('../websocket/ws_eventTypes');
var router = express.Router();

router.use(express.json());

// Create new task
router.post('/', (req, res) => {
  if (!('title' in req.body)) {
    res.status(400).json({error: "Missing required field 'title'"});
  } else if (!('description' in req.body)) {
    res.status(400).json({error: "Missing required field 'description'"});
  } else if (!('stateColumnId' in req.body)) {
    res.status(400).json({error: "Missing required field 'stateColumnId'"});
  } else if (!('order' in req.body)) {
    res.status(400).json({error: "Missing required field 'order'"});
  } else {
    models.task.create({
      title: req.body.title,
      description: req.body.description,
      stateColumnId: req.body.stateColumnId,
      order: req.body.order,
    }).then(task => {
      res.status(201).json({task: task});
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
    wss.updateOtherClients(req.body.clientId, req.body.task, eventType, details);
  });
}

module.exports = router;