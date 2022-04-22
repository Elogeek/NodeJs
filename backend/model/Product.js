//Import mongoose
const mongoose = require('mongoose');
//Import schema depuis mongoose
const {Schema} = mongoose;

//création schema
const ProductSchemas = new Schema({
    name: {
        type: String, // type => type data attendu
        required: true // here required => champs obligatoire/ou non
    },
    description: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchemas);