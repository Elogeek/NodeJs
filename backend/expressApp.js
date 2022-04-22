const express = require('express');
const sequelize = require('./db');
const ProductsController = require('./Controller/ProductsController');

// Initialisation de Express.
const expressApp = express();
expressApp.use('/assets', express.static(__dirname + '/../public/build'));
expressApp.use(express.json());

expressApp.use((req, res, next) => {
    console.log("Requête reçue => " + req.url);
    next();
});

expressApp.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.status(200);
    next();
});

expressApp.get('/', (req, res, next) => {
    const response = {
        message: "Hello World",
    }
    res.json(response);
    next();
});

// Get products route.
expressApp.get('/products', (req, res, next) =>
  ProductsController.getProducts(req, res, next, sequelize)
);

// Ajout d'un produit.
expressApp.post('/product/add', (req, res, next) =>
  ProductsController.addProduct(req, res, next, sequelize)
);

// Modification d'un produit.
expressApp.post('/product/edit', (req, res, next) =>
  ProductsController.editProduct(req, res, next, sequelize)
);

// Suppression d'un produit.
expressApp.post('/product/delete', (req, res, next) =>
  ProductsController.deleteProduct(req, res, next, sequelize)
);


// Handle 404 errors.
expressApp.use(function(req, res, next) {
    if (!req.route) {
        res
            .status(404)
            .end()
        ;
    }
    next();
});

expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode);
    console.log('Requête terminée, réponse envoyée au client');
});

module.exports = expressApp;