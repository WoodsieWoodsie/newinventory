'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {title: 'Item Manager'});
});

module.exports = router;