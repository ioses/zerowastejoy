'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var ShopLocation = require ('../models/shop_location');
var User = require ('../models/user');
var LikeShopLocation = require ('../models/like_shop_location');


function saveLikeShopLocation(req,res){
    //Recoge lo que viene por POST
    var params = req.body;
    
    var likeShopLocation = new ShopLocation();

    //Usuario que emite el voto
    likeShopLocation.user = req.user.sub;

    likeShopLocation.shop_location = params.shop_location;
    likeShopLocation.value = params.value;
    likeShopLocation.created_at = moment().unix();

    //Habrá que chequear si el usuario ha votado anteriormente al mismo relato TO-DO

    likeShopLocation.save((err, likeShopLocationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar el like'});

		if(!likeShopLocationStored) return res.status(404).send({message: 'El like no se ha guardado'});

		if(likeShopLocationStored) return res.status(200).send({likeShopLocation: likeShopLocationStored});
    });

}


//Habrá que chequear si el usuario ha votado anteriormente al relato TO-DO
function deleteLikeShopLocation(req,res){
    var userId = req.user.sub;
    var shopLocationId = req.params.shop_location;

    Like.find({'user': userId, 'shop_location': shopLocationId}).remove((err =>{
		if(err) return res.status(500).send({message: 'Error al borrar el like'});

		return res.status(200).send({message: 'El like se ha eliminado'});
    }))
}


function getLikesShopLocation(req,res){

    var shopLocationId = req.params.shop_location;

    var userId = req.user.sub;

    likesShopLocation(shopLocationId).then((value)=>{
        return res.status(200).send({
            shopLocationId,
            positiveLikesShopLocation: value.positiveLikesShopLocation,
            negativeLikesShopLocation: value.negativeLikesShopLocation
        });
    });

}

async function likesShopLocation(shop_location_id){
    try{
        var positiveLikesShopLocation = await LikeShopLocation.count({'shop_location': shop_location_id, 'value': '1'}).exec()
        .then((likes)=>{
            
            return likes;
        }).catch((err)=>{
            return handleError(err);
        });

        var negativeLikesShopLocation = await LikeShopLocation.count({'shop_location': shop_location_id, 'value': '0'}).exec()
        .then((unlikes)=>{
            
            return unlikes;
        }).catch((err)=>{
            return handleError(err);
        });

        return {
            positiveLikesShopLocation: positiveLikesShopLocation,
            negativeLikesShopLocation: negativeLikesShopLocation
        }


    }catch(e){
        console.log(e);
    }
}


module.exports = {
    saveLikeShopLocation,
    deleteLikeShopLocation,
    getLikesShopLocation
}