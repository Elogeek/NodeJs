const express = require('express');
const fetch = require('node-fetch');
const fs = require ('fs').promises;
const path = require('path');

const expressApp = express();
expressApp.use('/assets', express.static(__dirname + '/../public/build'));

const pages = new Map();
const loadFiles = async () => {
    // Récuperation des files présents dans le dossier html
    const files = await fs.readdir(__dirname + '/../html/');
    // Pour chaque fichier
    files.map(async file => {
        // Je lis son contenu en m'assurant d'avoir un chemin absolu (path.resolve)
        const fileContents = await fs.readFile(path.resolve(__dirname + '/../html/' + file));
        // J'ajoute une entrée dans mon Map dont la clé est le name du fichier, et la value,...le contenu du fichier
        pages.set(path.basename(file), await fileContents);
        // Log les files de manière à pouvoir controler que tous mes fichiers sont bien chargés au démarrage
        console.log(path.basename(file));
    })
}

loadFiles().then(() => {
    expressApp.use((req, res, next) => {
        console.log("Requête reçue => " + req.url);
        next();
    });

    expressApp.use((req, res, next) => {
        res.setHeader("Content-Type", "text/html");
        res.status(200);
        next();
    });

    expressApp.use((req, res, next) => {
        res.send(pages.get('index.html'));
        next();
    });

    expressApp.use((req, res) => {
        console.log("Code response: " + res.statusCode);
        console.log('Requête terminée, réponse envoyée au client');
    });
})
    .catch(err => {
        console.error("Problème de chargement des fichiers du serveur: ", err);
        expressApp.use((req, res) => {
           res.status(500);
        });
        process.exit(1);
});

module.exports = expressApp;