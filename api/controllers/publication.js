'use strict'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Publication = require ('../models/publication');
var User = require ('../models/user');
var Follow = require ('../models/follow');

function savePublication (req, res){
    var params = req.body;

    var publication = new Publication();

    if (!params.text) return res.status(200).send({message:'Debes enviar un texto'});

    publication.text = params.text;
    publication.file = 'null';
    publication.user = req.user.sub;
    publication.created_at = moment().unix();

    publication.save((err, publicationStored)=>{
        if(err) return res.status(500).send({message: 'Error al guardar la publicacion'});

        if(!publicationStored) return res.status(404).send({message: 'La publicacion no ha sido guardada'});

        return res.status(200).send({publication: publicationStored});
        })
}

function getPublications(req,res){

    //Nos muestra en la página en la que estamos
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage = 4;

    //Busqueda de usuarios a los que seguimos
    
    Follow.find({user: req.user.sub}).populate('followed').exec((err, follows)=>{
        if(err) return res.status(500).send({message: 'Error al devolver el seguimiento'});

        //Devolver los ids en un array
        var follows_clean = [];

        follows.forEach((follow)=>{
            follows_clean.push(follow.followed);
        });

        follows_clean.push(req.user.sub);

        //Busca los contenidos cuyo usuario esté contenido en follows_clean
        Publication.find({user:{"$in": follows_clean}}).sort('-created_at').populate('user')
        .paginate(page, itemsPerPage, (err, publications, total)=>{
            if(err) return res.status(500).send({message: 'Error al devolver publicaciones'});    
            
            if(!publications) return res.status(404).send({message: 'No hay publicaciones'});

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                items_per_page: itemsPerPage,
                publications
            })
            
        });

    });
}

function getPublicationsUser(req,res){

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

    //Busqueda de usuarios a los que seguimos
    
    //Busca los contenidos cuyo usuario esté contenido en follows_clean
        Publication.find({user:user_id}).sort('-created_at').populate('user')
        .paginate(page, itemsPerPage, (err, publications, total)=>{
            if(err) return res.status(500).send({message: 'Error al devolver publicaciones'});    
            
            if(!publications) return res.status(404).send({message: 'No hay publicaciones'});

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total/itemsPerPage),
                page: page,
                items_per_page: itemsPerPage,
                publications
            })
            
        });
}


function getPublication(req, res){
    var publicationId = req.params.id;

    Publication.findById(publicationId,(err,publication)=>{
        if(err) return res.status(500).send({message: 'Error al devolver la publicacion'});   

        if(!publication) return res.status(404).send({message: 'No existe la publicacion'});

        return res.status(200).send({publication});

    });

}

function deletePublication(req,res){
    var publicationId = req.params.id;

    Publication.find({user: req.user.sub, '_id':publicationId}).remove(err=>{
        if(err) return res.status(500).send({message: 'Error al borrar la publicacion'});   

        return res.status(200).send({message:"publicacion eliminada" });
    });
}

//Subir archivos de imagen/avatar de usuario

function uploadImage(req,res){
	var publicationId = req.params.id;

	console.log("Antes de entrar");

	if (req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
        console.log("File Path: "+file_path);
        console.log("File Split: "+file_split);


		var file_name = file_split[2];
		console.log(file_name);

		var ext_split = file_name.split('\.');
		console.log(ext_split);

		var file_ext = ext_split[1];

		if (file_ext== 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            //Actualizar documento de publicacion
            
            Publication.findOne({'user':req.user.sub, '_id': publicationId}).exec((err,publication)=>{

                if(publication){
                    Publication.findByIdAndUpdate(publicationId,{file: file_name}, {new:true},(err,publicationUpdated)=>{
                        if(err) return res.status(500).send({message: 'Error en la peticion'});
        
                        if(!publicationUpdated) return res.status(404).send({message: 'no hay usuarios disponibles'});
        
                        return res.status(200).send({user: publicationUpdated});
                    });
                }else{
                    return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar esta publicacion');
                }
            });

		}else{
			
			return removeFilesOfUploads(res, file_path, 'Extension no valida');
			
		}
	}else{
		return res.status(200).send({message: 'No se han subido archivos'});
	}

}


function getImageFile(req,res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/publications/'+image_file;

	fs.exists(path_file,(exists)=>{
		if(exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	})
}








module.exports = {
    savePublication, 
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImageFile,
    getPublicationsUser
}

function removeFilesOfUploads(res, file_path,message){
	fs.unlink(file_path,(err)=>{
				return res.status(200).send({message: message});	
			});
}