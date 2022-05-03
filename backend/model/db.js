/** Connect to Moongose
const mongoose = require('mongoose');

// Initialisation de Mongoose:
const dbConnect = async () => await mongoose.connect(
  "mongodb+srv://Nux007:sssBHEXjzt3RyTfk@cluster0.zp1ku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

dbConnect()
  .catch(err => {
    console.error("Erreur de connexion à la db: " + err);
    process.exit(1);
  })
;

module.exports = mongoose;
 **/

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
