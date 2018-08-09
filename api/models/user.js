'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: String,
	surname: String,
	nick: String,
	email: String,
	password: String,
	role: String,
	image: String
});

// Exportacion. Se usa el nombre de la entidad y el schema
//Se exporta el modelo de mongoose (mongoose.model) se indica el nombre de la entidad y el formato del modelo
//Al guardar un objeto en BBDD se guarda como users
module.exports = mongoose.model('User', UserSchema);