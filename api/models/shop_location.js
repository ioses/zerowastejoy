'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopLocationSchema = Schema({
    name: String,
    password: String,
    text: String,
	telephone: String,
    email: String,
    address: String,
	city: String,
	country: String,
    image: String,
    latitude: String,
    longitude: String
});

// Exportacion. Se usa el nombre de la entidad y el schema
//Se exporta el modelo de mongoose (mongoose.model) se indica el nombre de la entidad y el formato del modelo
//Al guardar un objeto en BBDD se guarda como users
module.exports = mongoose.model('ShopLocation', ShopLocationSchema);