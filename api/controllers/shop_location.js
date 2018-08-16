'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var ShopLocation = require ('../models/shop_location');
var Follow = require('../models/follow');

var jwt = require('../services/jwt');


//Registro de Lugar
function saveShopLocation(req,res){
	var params = req.body;
	var shopLocation = new ShopLocation();

	if(params.name && params.surname && params.nick && 
		params.email && params.password){

			shopLocation.name = params.name;
			shopLocation.text = params.surname;
			shopLocation.telephone = params.nick;
			shopLocation.email = params.email;
			shopLocation.address = params.address;
            shopLocation.city = params.city;
            shopLocation.country = params.country;
            shopLocation.image = null;
            shopLocation.longitude = params;longitude,
            shopLocation.latitude = params.latitude;
            
			//chequea si existe ya el mail o nick	

			ShopLocation.find({$or: [
								{email: shopLocation.email.toLowerCase()},
								{name: shopLocation.nick.toLowerCase()}
				]}).exec((err, shops)=>{
					if(err)res.status(500).send({message: 'Error en la petición de usuarios'});

					if (shops && shops.length >= 1){
						console.log(shops);
						return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
					}else{



						//Cifra el password y guarda los datos
						bcrypt.hash(params.password, null, null, (err, hash)=>{
							shopLocation.password = hash;

							shopLocation.save((err, shopLocationStored)=>{
								if(err)res.status(500).send({message: 'Error al guardar el usuario'});

								if(shopLocationStored){
									res.status(200).send({shopLocation: shopLocationStored});
								}else{
									res.status(404).send({message: 'No se ha registrado el usuario'});
								}
							});
						});
					}
				});
		
		

	}else{
		res.status(200).send({
			message: 'Envía los campos necesarios'
		});
	}
}