'use strict';

// require dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// define listening port
var PORT = process.env.PORT || 3000;

//  connect to db
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/new-inventory');

// initialize express app
var app = express();

// view engine
app.set('view engine', 'jade');

// general middleware
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static('public'));

// routes
app.use('/', require('./routes/index'));
app.use('/items', require('./routes/items'));
app.use('/rooms', require('./routes/rooms'));

// 404 handler
app.use(function(req, res){
  res.status(404).send('404 Not Found');
});

// start server listening
app.listen(PORT, function(){
  console.log(`Express listening on port ${PORT}.`);
});