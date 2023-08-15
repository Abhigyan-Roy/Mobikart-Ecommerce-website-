const mongoose = require('mongoose');
const Comment=require('../models/comment');
const Rating=require('../models/rating');
const productSchema = new mongoose.Schema({
    imagePath:{
        type: String,
        required: true
    },
    bigImg:{
        type:String,
        required: true
    },
    frontcam:{
        type: String,
        required: true
    },
    rearcam:{
        type: String,
        required: true
    },
    Android:{
        type: String,
        required: true
    },
    battery:{
        type: Number,
        required: true
    },
    processor:{
        type: String,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    color:{
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
    longdesc:{
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
    },
    ratings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        }
    ],
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    additionalImagePaths: [{
        type: String
    }],
    binkies:{
        type: String
    }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;