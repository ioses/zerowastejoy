'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PublicationSchema = Schema({
	text: String,
	file: String,
	created_at: String,
	//Crea la referencia con el modelo de User -- 
	//Al hacer populate, se sustituye por los datos del usuario que ha creado la publicacion
    user: { type: Schema.ObjectId, ref: 'User' },
    typePublication:{ type: Schema.ObjectId, ref: 'TypePublication' }
});

module.exports = mongoose.model('Publication', PublicationSchema);