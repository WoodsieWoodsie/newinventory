'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room;

var roomSchema = Schema({
  name: { type: String, required: false },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  createdAt: { type: Date, default: new Date() }
});

Room = mongoose.model('Room', roomSchema);

module.exports = Room;