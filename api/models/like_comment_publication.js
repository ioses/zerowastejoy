'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LikeCommentPublicationSchema = Schema ({
    value: String,
    comment_publication: { type: Schema.ObjectId, ref: 'CommentPublication'},
    user: { type: Schema.ObjectId, ref: 'User' },
    created_at: String

});

module.exports = mongoose.model('LikeCommentPublication', LikeCommentPublicationSchema);