'use strict'

var express = require('express');
var MessageController = require('../controllers/like_comment_publication');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');




module.exports = api;