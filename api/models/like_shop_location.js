'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LikeShopLocationSchema = Schema ({
    value: String,
    shop_location: { type: Schema.ObjectId, ref: 'ShopLocation'},
    user: { type: Schema.ObjectId, ref: 'User' },
    created_at: String

});

module.exports = mongoose.model('LikeShopLocation', LikeShopLocationSchema);