const mongoose = require('mongoose');
const User=require('../models/user');
const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    star:{
        type: Number,
        default:0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;