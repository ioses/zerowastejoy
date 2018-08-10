'use strict'

var express = require('express');
var LikeCommentPublicationController = require('../controllers/like_comment_publication');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/like_publication', md_auth.ensureAuth, LikeCommentPublicationController.saveLikeCommentPublication);
api.delete('/like_publication/:publication',md_auth.ensureAuth, LikeCommentPublicationController.deleteLikeCommentPublication);
api.get('/likes_publication/:publication', md_auth.ensureAuth, LikeCommentPublicationController.getLikesCommentPublication);


module.exports = api;