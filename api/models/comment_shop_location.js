'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentShopLocationSchema = Schema ({
    text: String,
    created_at: String,
    shop_location: { type: Schema.ObjectId, ref: 'ShopLocation'},
    user: { type: Schema.ObjectId, ref: 'User'}
    
});

module.exports = mongoose.model ('CommentShopLocation', CommentShopLocationSchema);