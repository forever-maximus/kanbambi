var express = require('express');
var models = require('../models');
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
  // Check if a task reordering happened
  const prevOrder = req.query.prevOrder;
  if (prevOrder !== undefined) {
    reorderTasks(req, res, prevOrder);
  } else {
    updateTask(req, res);
  }
});

// Handle reordering tasks within a column
function reorderTasks(req, res, prevOrder) {
  // TODO: put this in a transaction
  if (prevOrder > req.body.order) {
    // Order has moved lower in the column
    return models.task.increment('order', { 
      where: { 
        order: {
          $lt: prevOrder,
          $gte: req.body.order
        },
        stateColumnId: req.body.stateColumnId
      }}
    ).then(() => {
      updateTask(req, res);
    });
  }

  // Order has moved higher in the column
  return models.task.decrement('order', { 
    where: { 
      order: {
        $lte: req.body.order,
        $gt: prevOrder
      },
      stateColumnId: req.body.stateColumnId
    }}
  ).then(() => {
    updateTask(req, res);
  });
}

// Update task
function updateTask(req, res) {
  return models.task.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({task: req.body});
  });
}

module.exports = router;