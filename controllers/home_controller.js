const { updateOne } = require('../models/user');
const User = require('../models/user');
const Product = require('../models/product');

module.exports.home = function (req, res) {
    var search = '';
    if (req.query.search) {
        search = req.query.search;
        Product.find({
            $or: [
                { brand: { $regex: '.*' + search + '.*', $options: 'i' } },
                { desc: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }, function (err, products) {
            if (err) {
                console.log("error in fetching");
                return;
            }
            if (req.user) {
                return res.render('phonebycompany', {
                    title: "STORE",
                    products: products,
                    cart: req.user.cart
                });
            }
            else {
                return res.render('phonebycompany', {
                    title: "STORE",
                    products: products
                });
            }
            ;

        })
    }
    else if (req.user) {
        return res.render('home', { cart: req.user.cart });
    }
    else
        return res.render('home');
}