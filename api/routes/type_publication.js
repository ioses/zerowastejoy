'use strict'

var express = require('express');
var TypePublicationController = require('../controllers/type_publication');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/type_publication', md_auth.ensureAuth, TypePublicationController.saveTypePublication);
api.get('/type_publications/',md_auth.ensureAuth, TypePublicationController.getTypePublications);


module.exports = api;