'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require ('../models/publication');
var TypePublication = require('../models/type_publication');


function saveTypePublication (req, res){
    var params = req.body;

    var typePublication = new TypePublication();

    if (!params.name_type_publication) return res.status(200).send({message:'Debes enviar un tipo'});

    typePublication.name = params.name_type_publication;
    typePublication.user = req.user.sub;
    typePublication.created_at = moment().unix();

    typePublication.save((err, typePublicationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar la publicacion'});

        if(!typePublicationStored) return res.status(404).send({message: 'l tipo no ha sido guardada'});

        return res.status(200).send({typePublication: typePublicationStored});
        })
}



function getTypePublications(req,res){

    //Busca los contenidos cuyo usuario esté contenido en follows_clean
    TypePublication.find().populate('user').exec((err,typePublication)=>{
        if(err) return res.status(500).send({message: 'Error al devolver la publicacion'});   

        if(!typePublication) return res.status(404).send({message: 'No existe la publicacion'});
    
        return res.status(200).send({typePublication: typePublication});
    });
        
}

module.exports = {
    saveTypePublication,
    getTypePublications
}