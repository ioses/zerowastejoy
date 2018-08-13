'use strict'

var express = require('express');
var BlockedController = require('../controllers/blocked');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/blocked', md_auth.ensureAuth, BlockedController.saveBlocked);
api.delete('/blocked/:id', md_auth.ensureAuth, BlockedController.deleteBlocked);

api.get('/get-my-blocked', md_auth.ensureAuth, BlockedController.getMyBlockeds);


module.exports = api;