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
expressApp.get('/',(req, res, next) => {
    const answer = {
        message: "Hello word ! ",
    }
    res.json(answer);
    next();
});

expressApp.get("/hello", (req, res, next) => {
    res.json({coucou: "Coucou !"});
    next();
});

expressApp.get("/hello/:name/:age?", (req, res, next) => {
    const params = req.params;
    const message = undefined === params.age ? `Hello ${req.params.name}` : `Hello ${req.params.name}, vous avez ${params.age} ans`;
    res.json({coucou: message });
    next();
});

// Handle 404
expressApp.use(function (req, res, next){
    if (!req.route) {
        res
            .status(404)
            .end()
        ;
    }
    next();
});

// Exécute un log une fois la requête finish
expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode);
    console.log("Request finish, response send user")
});

module.exports = expressApp;