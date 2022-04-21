const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("nodejs_database", "dev", "dev", {
    dialect: "mysql",
    host: "localhost"
});

// Tentative de connection, en cas d'erreur on quitte l'application
sequelize.authenticate()
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
;

module.exports = sequelize;