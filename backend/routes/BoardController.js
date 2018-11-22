var express = require('express');
var models = require('../models');
var router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  models.board.findAll().then(boards => {
    res.json({boards: boards});
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
        { name: 'To Do' },
        { name: 'In Progress' },
        { name: 'Done' },
      ]
    }, {
      include: [ models.state_column ]
    }).then(board => {
      res.status(201).json({board: board});
    });
  }
});

module.exports = router;