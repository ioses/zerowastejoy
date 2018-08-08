'use strict'

//Archivo de configuracion general

//Carga el modulo de express. carga de rutas, prot. http
var express = require('express');
//Convierte lo que viene por POST,GET.. en objetos JS
var bodyParse = require ('body-parser');

//Carga el FW de express
var app = express();

//Cargar rutas

/*
var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');
var publication_routes = require('./routes/publication');
var message_routes = require('./routes/message');
*/

//Cargar middlewares

//Convierte los datos de las peticiones a JSON
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());



//CORS
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

/*
//rutas
app.use('/api', user_routes);

app.use('/api', follow_routes);

app.use('/api',publication_routes);

app.use('/api', message_routes);
*/

//Exportar
//Exporta la configuracion
module.exports = app;