'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LikeCommentSchema = Schema ({
    value: String,
    comment: { type: Schema.ObjectId, ref: 'Comment'},
    user: { type: Schema.ObjectId, ref: 'User' },
    created_at: String

});

module.exports = mongoose.model('LikeComment', LikeCommentSchema);