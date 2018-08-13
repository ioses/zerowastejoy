'use strict'

var mongoosePaginate = require('mongoose-pagination');


var User = require('../models/user');
var Blocked = require('../models/blocked');

function saveBlocked(req,res){
	
	//Recoge lo que viene por POST
	var params = req.body;

	var blocked = new Blocked();
	//Lo coge de la decodificacion del middleware
	blocked.user = req.user.sub;
	//La info que se pasa por POST
	blocked.bloquea_a = params.bloquea_a;
	blocked.created_at = moment().unix();

	blocked.save((err,blockedStored)=>{
		if(err) return res.status(500).send({message: 'Error al guardar el seguimiento'});

		if(!blockedStored) return res.status(404).send({message: 'El seguimiento no se ha guardado'});

		if(blockedStored) return res.status(200).send({blocked: blockedStored});
	});

}


function deleteBlocked(req,res){
	var userId = req.user.sub;
	var blockedId = req.params.id;

	Blocked.find({'user': userId, 'followed':blockedId}).remove((err =>{
		if(err) return res.status(500).send({message: 'Error al borrar el seguimiento'});

		return res.status(200).send({message: 'El bloqueo se ha eliminado'});
	}));
}


//Devolver listados de usuarios bloqueados
function getMyBlockeds(req,res){
	var userId = req.user.sub;

	var find = Blocked.find({user: userId});

	find.populate('user bloquea_a').exec((err, blocked)=>{
		if (err) return res.status(500).send({message: 'Error en la solicitud de peticion de follows'});

		if(!follows) return res.status(404).send({message: 'No sigues a ningun usuario'});
		
				return res.status(200).send({blocked});

	});
}


module.exports = {
	saveBlocked,
    deleteBlocked,
    getMyBlockeds
}