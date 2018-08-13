'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FollowSchema = Schema ({
	user: { type: Schema.ObjectId, ref: 'User'},
	sigue_a: { type: Schema.ObjectId, ref: 'User'},
	created_at: String
});

module.exports = mongoose.model('Follow', FollowSchema);