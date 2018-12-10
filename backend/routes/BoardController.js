var express = require('express');
var models = require('../models');
var router = express.Router();

router.use(express.json());

// Get all kanban boards
router.get('/', (req, res) => {
  models.board.findAll().then(boards => {
    res.json({boards: boards});
  });
});

// Get specific kanban board and related components
router.get('/:id', (req, res) => {
  models.board.findByPk(req.params.id, {
    include: [{
      model: models.state_column, 
      include: [{
        model: models.task
      }]
    }],
    order: [
      [models.state_column, 'order', 'asc'],
      [models.state_column, models.task, 'order', 'asc']
    ]
  }).then(board => {
    res.json({board: board});
  });
});

// Update a board by id
router.patch('/:id', (req, res) => {
  models.board.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({board: req.body});
  });
});

// Create new kanban board - initialise 3 default state columns
router.post('/', (req, res) => {
  if (!('name' in req.body)) {
    res.status(400).json({error: "Missing required field 'name'"});
  } else if (!('description' in req.body)) {
    res.status(400).json({error: "Missing required field 'description'"});
  } else {
    models.board.create({
      name: req.body.name,
      description: req.body.description,
      state_columns: [
        { name: 'To Do', order: 1 },
        { name: 'In Progress', order: 2 },
        { name: 'Done', order: 3 },
      ]
    }, {
      include: [ models.state_column ]
    }).then(board => {
      res.status(201).json({board: board});
    });
  }
});

module.exports = router;