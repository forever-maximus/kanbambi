var express = require('express');
var models = require('../models');
var wss = require('../websocket/websocket');
const eventTypes = require('../websocket/ws_eventTypes');
var router = express.Router();

router.use(express.json());

// Update label
router.patch('/:id', (req, res) => {
  models.label.update(req.body.label, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({label: req.body.label});
    // Need to update other clients here
  });
});

module.exports = router;