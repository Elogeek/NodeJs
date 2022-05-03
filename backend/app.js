const express = require('express');
const product = require('./routes/products');
const user = require('./routes/users');
require('./model/db');

// Initialisation de Express.
const app = express();
app.use('/assets', express.static(__dirname + '/../public/build'));
app.use(express.json());

// Middleware principal
app.use((req, res, next) => {
    console.log("Requête reçue => " + req.url);
    /*if (!req.route) {
        res.status(404).end();
    }*/
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

// Middleware des produits.
app.use('/product', product);
app.use('/user', user);

// Gestion 404
app.use((req, res) => {
    if (!req.route) {
        res.status(404).end();
    }
});

module.exports = app
