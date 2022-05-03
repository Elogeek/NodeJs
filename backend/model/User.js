const mongoose = require('mongoose');
const {Schema} = mongoose;
const UniqueValidator = require('mongoose-unique-validator');

const UserSchemas = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },

});

UserSchemas.plugin(UniqueValidator);
module.exports = mongoose.model('User', UserSchemas);
