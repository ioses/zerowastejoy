'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LikePublicationSchema = Schema ({
    value: String,
    publication: { type: Schema.ObjectId, ref: 'Publication'},
    user: { type: Schema.ObjectId, ref: 'User' },
    created_at: String

});

module.exports = mongoose.model('LikePublication', LikePublicationSchema);