'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = Schema ({
    text: String,
    created_at: String,
    publication: { type: Schema.ObjectId, ref: 'Publication'},
    user: { type: Schema.ObjectId, ref: 'User'}
    
});

module.exports = mongoose.model ('Comment', CommentSchema);