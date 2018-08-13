'use strict'

var express = require('express');
var CommentPublicationController = require('../controllers/comment_publication');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/comment_publication', md_auth.ensureAuth, CommentPublicationController.saveCommentPublication);
api.get('/comments_publication/:publication/:page?',md_auth.ensureAuth, CommentPublicationController.getCommentsPublication);
api.get('/comments_publication_user/:user_id/:page?', md_auth.ensureAuth, CommentPublicationController.getCommentsPublicationUser);
api.get('/comment_publication/:id',md_auth.ensureAuth, CommentPublicationController.getCommentPublication);
api.delete('/comment_publication/:id',md_auth.ensureAuth, CommentPublicationController.deleteCommentPublication);


module.exports = api;