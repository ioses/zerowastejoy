'use strict'

var express = require('express');
var MessageController = require('../controllers/blocked');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');




module.exports = api;