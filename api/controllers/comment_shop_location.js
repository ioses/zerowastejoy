'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var ShopLocation = require ('../models/shop_location');
var User = require ('../models/user');
var CommentShopLocation = require('../models/comment_shop_location');


function saveCommentShopLocation (req, res){
    var params = req.body;

    var commentShopLocation = new CommentShopLocation();

    if (!params.text || !params.shop_location) return res.status(200).send({message:'Debes enviar un texto'});

    commentShopLocation.text = params.text;
    commentShopLocation.shop_location = params.shop_location;
    commentShopLocation.user = req.user.sub;
    commentShopLocation.created_at = moment().unix();

    commentShopLocation.save((err, commentShopLocationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar el comentario'});

        if(!commentShopLocationStored) return res.status(404).send({message: 'El comentario no ha sido guardada'});

        return res.status(200).send({commentShopLocation: commentShopLocationStored});
        })
}

function getCommentsShopLocation(req,res){
    //Nos muestra en la página en la que estamos
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    var shop_location = req.params.shop_location;
    var itemsPerPage = 4;

    Comment.find({shop_location: shop_location}).sort('created-at').populate('user').populate('shop_location')
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
function getCommentsShopLocationUser(req,res){

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
        CommentShopLocation.find({user:user_id}).sort('-created_at').populate('user').populate('shop_location')
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


function getCommentShopLocation(req, res){
    var commentShopLocationId = req.params.id;

    ShopLocation.findById(commentShopLocationId,(err,shop_location)=>{
        if(err) return res.status(500).send({message: 'Error al devolver la tienda'});   

        if(!shop_location) return res.status(404).send({message: 'No existe la tienda'});

        return res.status(200).send({shop_location});

    });

}

function deleteCommentShopLocation(req,res){
    var commentShopLocationId = req.params.id;

    CommentShopLocation.find({user: req.user.sub, '_id':commentShopLocationId}).remove(err=>{
        if(err) return res.status(500).send({message: 'Error al borrar el comentario'});   

        return res.status(200).send({message:"comentario eliminado" });
    });
}


module.exports = {
    saveCommentShopLocation,
    getCommentsShopLocation,
    getCommentsShopLocationUser,
    getCommentShopLocation,
    deleteCommentShopLocation
}