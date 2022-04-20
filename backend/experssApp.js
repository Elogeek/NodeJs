const express = require('express');

const expressApp = express();

// First middleware (s'occupe de logger les requêtes entrantes par les users)
expressApp.use((req,res,next) => {
    console.log("request reçue => " + req.url)
    next();
});

// Spécifie un code d'état
expressApp.use((req,res,next) => {
    res.status(200);
    next();
})

// Envoye une response au client
expressApp.use((req, res, next) => {
    res.send("Hello word ! ");
    next();
});

// Exécute un log une fois la requête finish
expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode);
    console.log("Request finish, response send user")
});

module.exports = expressApp;