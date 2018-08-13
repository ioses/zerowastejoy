'use strict'

var express = require('express');
var CommentShopLocationController = require('../controllers/comment_shop_location');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');




module.exports = api;