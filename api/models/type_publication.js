'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TypePublicationSchema = Schema ({
    value: String
});

module.exports = mongoose.model('TypePublication', TypePublicationSchema);