'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');


//Mejor en un fichero separado para no tenerla copiada
var secret = 'clave_secreta_zero_waste_joy_se_cambiara_de_lugar';

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticacion'});
	}

	var token = req.headers.authorization.replace(/['"]+/g,'');

	
	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El token ha expirado'});
		}


	}catch(ex){
		return res.status(404).send({message: 'El token no es valido'});
	}

	//Crea una variable user en el request que corresponde con el payload
	req.user = payload;

	next();

}