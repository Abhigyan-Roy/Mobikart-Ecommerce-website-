const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema({
    imageRoute:{
        type:String,
        required: true
    },
    frontcam:{
        type: Number,
        required: true
    },
    rearcam:{
        type: Number,
        required: true
    },
    Android:{
        type: Number,
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
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
});
const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;