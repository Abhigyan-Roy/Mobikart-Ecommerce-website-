const { updateOne } = require('../models/user');
const User = require('../models/user');
const Product = require('../models/product');

module.exports.home = function (req, res) {
    var search = '';
    if (req.query.search) {
      const search = req.query.search.trim().split(/\s+/); // split search string into array of words and remove leading/trailing spaces
      const regexes = search.map(term => new RegExp(term, 'i')); // create a regex for each term
      const query = {
        $and: regexes.map(regex => ({
          $or: [
            { brand: { $regex: regex } },
            { desc: { $regex: regex } }
          ]
        }))
      };
      Product.find(query, function (err, products) {
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
        } else {
          return res.render('phonebycompany', {
            title: "STORE",
            products: products
          });
        }
      });
    } else if (req.user) {
      return res.render('home', { cart: req.user.cart });
    } else {
      return res.render('home');
    }
  };
  
      
      