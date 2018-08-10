'use strict'

var express = require('express');
var LikeShopLocationController = require('../controllers/like_shop_location');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/like_shop_location', md_auth.ensureAuth, LikeShopLocationController.saveLikeShopLocation);
api.delete('/like_shop_location/:publication',md_auth.ensureAuth, LikeShopLocationController.deleteLikeShopLocation);
api.get('/likes_shop_location/:publication', md_auth.ensureAuth, LikeShopLocationController.getLikesShopLocation);




module.exports = api;