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

// Update task
router.patch('/:id', (req, res) => {
  models.task.update(req.body, {where: {id: req.params.id}}).then(() => {
    res.status(200).json({task: req.body});
  });
});

module.exports = router;