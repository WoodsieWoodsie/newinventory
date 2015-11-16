'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = require('./room');
var Item;

var itemSchema = Schema({
  name: { type: String, required: false },
  value: { type: Number, required: false },
  image: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: new Date() }
});

itemSchema.methods.inRoom = function(cb) {
  Room.findOne({items: this._id}, function(err, room){
    if(err) return cb(err);
    cb(null, room)
  });
};

itemSchema.statics.findNotInRoom = function(cb) {
  Room.find({}, function(err, rooms){
    if(err) return cb(err);
    var itemIds = rooms.reduce(function(itemIds, room){
      return itemIds.concat(room.items)
    }, []);
    Item.find({_id: {$nin: itemIds}}, cb);
  });
};

Item = mongoose.model('Item', itemSchema);

module.exports = Item;