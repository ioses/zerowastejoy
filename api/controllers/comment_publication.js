'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require ('../models/publication');
var User = require ('../models/user');
var CommentPublication = require('../models/comment_publication');


function saveCommentPublication (req, res){
    var params = req.body;

    var commentPublication = new CommentPublication();

    if (!params.text || !params.publication) return res.status(200).send({message:'Debes enviar un texto'});

    commentPublication.text = params.text;
    commentPublication.publication = params.publication;
    commentPublication.user = req.user.sub;
    commentPublication.created_at = moment().unix();

    commentPublication.save((err, commentPublicationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar el comentario'});

        if(!commentPublicationStored) return res.status(404).send({message: 'El comentario no ha sido guardada'});

        return res.status(200).send({commentPublication: commentPublicationStored});
        })
}


function getCommentsPublication(req,res){
    //Nos muestra en la página en la que estamos
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    var publication = req.params.publication;
    var itemsPerPage = 4;

    CommentPublication.find({publication: publication}).sort('created-at').populate('user').populate('publication')
    .paginate(page, itemsPerPage, (err, comments, total)=>{
        if(err) return res.status(500).send({message: 'Error al devolver comentarios'});    
        
        if(!comments) return res.status(404).send({message: 'No hay comentarios'});

        return res.status(200).send({
            total_items: total,
            pages: Math.ceil(total/itemsPerPage),
            page: page,
            items_per_page: itemsPerPage,
            comments
        })
        
    });
}



//Comentarios de usuario
function getCommentsPublicationUser(req,res){

    //Nos muestra en la página en la que estamos
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    var user_id = req.user.sub;
    //lo que viene por la url
    if(req.params.user_id){
        user_id = req.params.user_id;
    }

    var itemsPerPage = 4;
    
    //Busca los contenidos cuyo usuario esté contenido en follows_clean
        CommentPublication.find({user:user_id}).sort('-created_at').populate('user').populate('publication')
        .paginate(page, itemsPerPage, (err, comments, total)=>{
            if(err) return res.status(500).send({message: 'Error al devolver comentarios'});    
            
            if(!comments) return res.status(404).send({message: 'No hay comentarios'});

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                items_per_page: itemsPerPage,
                comments
            })
            
        });
}


function getCommentPublication(req, res){
    var commentPublicationId = req.params.id;

    Publication.findById(commentPublicationId,(err,publication)=>{
        if(err) return res.status(500).send({message: 'Error al devolver la publicacion'});   

        if(!publication) return res.status(404).send({message: 'No existe la publicacion'});

        return res.status(200).send({publication});

    });

}

function deleteCommentPublication(req,res){
    var commentPublicationId = req.params.id;

    Comment.find({user: req.user.sub, '_id':commentPublicationId}).remove(err=>{
        if(err) return res.status(500).send({message: 'Error al borrar el comentario'});   

        return res.status(200).send({message:"comentario eliminado" });
    });
}


module.exports = {
    saveCommentPublication,
    getCommentsPublication,
    getCommentsPublicationUser,
    getCommentPublication,
    deleteCommentPublication
}