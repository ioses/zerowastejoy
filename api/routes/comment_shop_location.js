'use strict'

var express = require('express');
var CommentShopLocationController = require('../controllers/comment_shop_location');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/comment_shop_location', md_auth.ensureAuth, CommentShopLocationController.saveCommentShopLocation);
api.get('/comments_shop_location/:shop_location/:page?',md_auth.ensureAuth, CommentShopLocationController.getCommentsShopLocation);
api.get('/comments_shop_location_user/:user_id/:page?', md_auth.ensureAuth, CommentShopLocationController.getCommentsShopLocationUser);
api.get('/comment_shop_location/:id',md_auth.ensureAuth, CommentShopLocationController.getCommentShopLocation);
api.delete('/comment_shop_location/:id',md_auth.ensureAuth, CommentShopLocationController.deleteCommentShopLocation);



module.exports = api;