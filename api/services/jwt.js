'use strict'

var jwt = require('jwt-simple');

var moment = require('moment');


//Mejor en un fichero separado para no tenerla copiada
var secret = 'clave_secreta_zero_waste_joy_se_cambiara_de_lugar';


exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix()
	};

	return jwt.encode(payload, secret);
};