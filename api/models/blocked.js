'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlockedSchema = Schema ({
	user: { type: Schema.ObjectId, ref: 'User'},
	bloquea_a: { type: Schema.ObjectId, ref: 'User'},
	created_at: String
});

module.exports = mongoose.model('Blocked', BlockedSchema);