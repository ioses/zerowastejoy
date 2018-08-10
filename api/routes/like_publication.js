'use strict'

var express = require('express');
var LikePublicationController = require('../controllers/like_publication');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/like_publication', md_auth.ensureAuth, LikePublicationController.saveLikePublication);
api.delete('/like_publication/:publication',md_auth.ensureAuth, LikePublicationController.deleteLikePublication);
api.get('/likes_publication/:publication', md_auth.ensureAuth, LikePublicationController.getLikesPublication);

module.exports = api;