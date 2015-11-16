'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');
var Room = require('../models/room');

// ITEMS

// router.get('/', function(req, res) {
//   Item.find({}, function(err, items) {
//     res.status(err ? 400 : 200).send(err || items);
//   });
// });

router.get('/', function(req, res) {
  Item.findNotInRoom(function(err, items) {
    res.status(err ? 400 : 200).send(err || items);
  });
});

router.post('/', function(req, res) {
  var item = new Item(req.body);
  item.save(function(err, savedItem) {
    res.status(err ? 400 : 200).send(err || savedItem);
  });
});

module.exports = router;