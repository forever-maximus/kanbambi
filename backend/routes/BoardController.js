var express = require('express');
var models = require('../models');
var router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  models.board.findAll().then(boards => {
    res.json({boards: boards});
  });
});

// Create new kanban board
router.post('/', (req, res) => {
  if (!('name' in req.body)) {
    res.status(400).json({error: "Missing required field 'name'"});
  } else {
    models.board.create({
      'name': req.body.name,
    }).then(board => {
      res.status(201).json({board: board});
    })
  }
});

module.exports = router;