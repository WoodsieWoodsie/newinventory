'use strict';

var express = require('express');
var router = express.Router();

var Room = require('../models/room');
var Item = require('../models/item');

// ROOMS

router.get('/', function(req, res) {
  Room.find({}, function(err, rooms) {
    res.status(err ? 400 : 200).send(err || rooms);
  });
});

router.post('/', function(req, res) {
  var room = new Room(req.body);
  room.save(function(err, savedRoom) {
    res.status(err ? 400 : 200).send(err || savedRoom);
  });
});

router.get('/:roomId/items', function(req, res) {
  Room.findById(req.params.roomId, function(err, room) {
    if(err) return res.status(400).send(err);
    res.send(room.items);
  }).populate('items');
});

router.put('/:roomId/additem/:itemId', function(req, res) {
  Room.findById(req.params.roomId, function(err, room){
    if(err) return res.status(400).send(err);
    Item.findById(req.params.itemId, function(err, item){
      if(err) return res.status(400).send(err);
      item.inRoom(function(err, foundRoom){
        if(err || foundRoom) return res.status(400).send(err || `Item in ${foundRoom.name} already.`);
        room.items.push(item._id);
        room.save(function(err, savedRoom){
          res.status(err ? 400 : 200).send(err || savedRoom);
        });
      });
    });
  });
});

module.exports = router;