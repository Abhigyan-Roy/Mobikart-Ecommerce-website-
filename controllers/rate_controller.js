const Product=require('../models/product');
const User = require('../models/user');
const Rating=require('../models/rating');

module.exports.createRate = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (product) {
      // check if the user has already rated the product
      Rating.findOne({
        userId: req.user._id,
        productId: req.params.id
      }, function(err, existingRating) {
        if (existingRating) {
          // if the user has already rated, update the rating value
          existingRating.rating = req.body.rating;
          existingRating.save(function(err) {
            if (err) {
              console.log(err);
              return res.redirect('back');
            }
            console.log(existingRating);
            res.redirect('back');
          });
        } else {
          // if the user hasn't rated, create a new rating
          Rating.create({
            userId: req.user._id,
            productId: req.params.id,
            rating: req.body.rating
          }, function(err, rating) {
            if (err) {
              console.log(err);
              return res.redirect('back');
            }
            console.log(rating);
            // update the ratings field of the corresponding product
            product.ratings.push(rating._id);
            product.save(function(err) {
              if (err) {
                console.log(err);
                return res.redirect('back');
              }
              res.redirect('back');
            });
          });
        }
      });
    }
  });
}