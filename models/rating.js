const mongoose = require('mongoose');
const User=require('../models/user');
const Product=require('../models/product');
const ratingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating:{
        type: Number,
        required:true
    }
  });
const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;