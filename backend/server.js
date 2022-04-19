const http = require('http');
const express = require('express');

const expressApp = express();
const server = http.createServer(expressApp);

// First middleware (s'occupe de logger les requêtes entrantes par les users)
expressApp.use((req,res,next) => {
    console.log("request reçue => " + req.url)
    next();
});

// Second middleware (envoye une response au client)
expressApp.use((req, res) => {
    res.send("Hello word ! ");
});

// Three middleware (exécute un log une fois la requête finish)
expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode);
    console.log("Request finish, response send user")
});

expressApp.set('port', process.env.PORT || 3000);
server.listen(process.env.PORT || 3000, () => console.log("Server started"));