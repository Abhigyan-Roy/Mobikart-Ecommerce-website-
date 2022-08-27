const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    imagePath:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    storage:{
        type: Number,
        required: true
    },
    ram:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    mrp:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;