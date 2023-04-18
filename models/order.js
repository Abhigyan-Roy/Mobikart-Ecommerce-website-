const mongoose = require('mongoose');
const User=require('../models/user');
const Product=require('../models/product');
const orderSchema = new mongoose.Schema({
    custId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ],
      phone: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      paymentType: {
        type: String,
        default: 'COD'
      },
      status: {
        type: String,
        default: 'Order Placed'
      }
  },{timestamps:true});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;