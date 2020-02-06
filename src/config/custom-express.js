require('marko/node-require').install();
require('marko/express');

// import express
const express = require('express');
// init express
const app = express();
// import bodyParser middlaware
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


app.use('/estatico', express.static('src/app/public'));

app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

// import rotas
const rotas = require('../app/rotas/rotas');
// init rotas w/ params app
rotas(app);
// export app
module.exports = app;