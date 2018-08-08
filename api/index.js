'use strict'

var mongoose = require('mongoose');
var app =require('./app');

//Config variables entorno
var port = 3800;


mongoose.Promise = global.Promise;

//Conexion base de datos  Funcion promesa, se puede usar then
mongoose.connect('mongodb://localhost:27017/zerowastejoy', {useMongoClient: true})
.then(()=>{
    console.log("conexion establecida correctamente");

    //Creacion del servidor (Siempre que se conecte correctamente a la DB)
    app.listen(port, ()=>{
        console.log("Servidor corriendo en http://localhost:3800");
    });
})
.catch(err => console.log(err));