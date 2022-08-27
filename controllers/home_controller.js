const { updateOne } = require('../models/user');
const User= require('../models/user');
const Product=require('../models/product');

module.exports.home=function(req,res)
{
    if(req.user)
    {
        return res.render('home',{ cart: req.user.cart});
    }
    return res.render('home');
}