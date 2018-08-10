'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var CommentPublication = require ('../models/comment_publication');
var User = require ('../models/user');
var LikeCommentPublication = require ('../models/like_comment_publication');


function saveLikeCommentPublication(req,res){
    //Recoge lo que viene por POST
    var params = req.body;
    
    var likeCommentPublication = new LikeCommentPublication();

    //Usuario que emite el voto
    likeCommentPublication.user = req.user.sub;

    likeCommentPublication.comment_publication = params.comment_publication;
    likeCommentPublication.value = params.value;
    likeCommentPublication.created_at = moment().unix();

    //Habrá que chequear si el usuario ha votado anteriormente al mismo relato TO-DO

    likeCommentPublication.save((err, likeCommentPublicationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar el like'});

		if(!likeCommentPublicationStored) return res.status(404).send({message: 'El like no se ha guardado'});

		if(likeCommentPublicationStored) return res.status(200).send({likeCommentPublication: likeCommentPublicationStored});
    });

}


function deleteLikeCommentPublication(req,res){
    var userId = req.user.sub;
    var commentPublicationId = req.params.comment_publication;

    Like.find({'user': userId, 'comment_publication': commentPublicationId}).remove((err =>{
		if(err) return res.status(500).send({message: 'Error al borrar el like'});

		return res.status(200).send({message: 'El like se ha eliminado'});
    }))
}


function getLikesCommentPublication(req,res){

    var commentPublicationId = req.params.comment_publication;

    var userId = req.user.sub;

    likesCommentPublication(commentPublicationId).then((value)=>{
        return res.status(200).send({
            commentPublicationId,
            positiveLikesCommentPublication: value.positiveLikesCommentPublication,
            negativeLikesCommentPublication: value.negativeLikesCommentPublication
        });
    });

}

async function likesCommentPublication(comment_publication_id){
    try{
        var positiveLikesCommentPublication = await LikeCommentPublication.count({'comment_publication': comment_publication_id, 'value': '1'}).exec()
        .then((likes)=>{
            
            return likes;
        }).catch((err)=>{
            return handleError(err);
        });

        var negativeLikesCommentPublication = await LikeCommentPublication.count({'comment_publication': comment_publication_id, 'value': '0'}).exec()
        .then((unlikes)=>{
            
            return unlikes;
        }).catch((err)=>{
            return handleError(err);
        });

        return {
            positiveLikesCommentPublication: positiveLikesCommentPublication,
            negativeLikesCommentPublication: negativeLikesCommentPublication
        }


    }catch(e){
        console.log(e);
    }
}

module.exports = {
    saveLikeCommentPublication,
    deleteLikeCommentPublication,
    getLikesCommentPublication
}