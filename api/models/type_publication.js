'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TypePublicationSchema = Schema ({
    name: String,
    created_at: String,
    user: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('TypePublication', TypePublicationSchema);