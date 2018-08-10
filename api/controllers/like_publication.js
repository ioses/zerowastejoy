'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require ('../models/publication');
var User = require ('../models/user');
var LikePublication = require ('../models/like_publication');


function saveLikePublication(req,res){
    //Recoge lo que viene por POST
    var params = req.body;
    
    var likePublication = new LikePublication();

    //Usuario que emite el voto
    likePublication.user = req.user.sub;

    likePublication.publication = params.publication;
    likePublication.value = params.value;
    likePublication.created_at = moment().unix();

    //Habrá que chequear si el usuario ha votado anteriormente al mismo relato TO-DO

    likePublication.save((err, likePublicationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar el like'});

		if(!likePublicationStored) return res.status(404).send({message: 'El like no se ha guardado'});

		if(likePublicationStored) return res.status(200).send({likePublication: likePublicationStored});
    });

}

//Habrá que chequear si el usuario ha votado anteriormente al relato TO-DO
function deleteLikePublication(req,res){
    var userId = req.user.sub;
    var publicationId = req.params.publication;

    Like.find({'user': userId, 'publication': publicationId}).remove((err =>{
		if(err) return res.status(500).send({message: 'Error al borrar el like'});

		return res.status(200).send({message: 'El like se ha eliminado'});
    }))
}


function getLikesPublication(req,res){

    var publicationId = req.params.publication;

    var userId = req.user.sub;

    likesPublication(publicationId).then((value)=>{
        return res.status(200).send({
            publicationId,
            positiveLikesPublication: value.positiveLikesPublication,
            negativeLikesPublication: value.negativeLikesPublication
        });
    });

}

async function likesPublication(publication_id){
    try{
        var positiveLikesPublication = await LikePublication.count({'publication': publication_id, 'value': '1'}).exec()
        .then((likes)=>{
            
            return likes;
        }).catch((err)=>{
            return handleError(err);
        });

        var negativeLikesPublication = await LikePublication.count({'publication': publication_id, 'value': '0'}).exec()
        .then((unlikes)=>{
            
            return unlikes;
        }).catch((err)=>{
            return handleError(err);
        });

        return {
            positiveLikesPublication: positiveLikesPublication,
            negativeLikesPublication: negativeLikesPublication
        }


    }catch(e){
        console.log(e);
    }
}



module.exports = {
    saveLikePublication,
    deleteLikePublication,
    getLikesPublication
}