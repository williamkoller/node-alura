require('marko/node-require').install();
require('marko/express');

// import express
const express = require('express');
// init express
const app = express();
// import rotas
const rotas = require('../app/rotas/rotas');
// init rotas w/ params app
rotas(app);
// export app
module.exports = app;