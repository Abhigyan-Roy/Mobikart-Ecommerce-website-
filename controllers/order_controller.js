const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
module.exports.createOrder = function(req, res) {
    // Retrieve the user's cart
    User.findById(req.user._id)
        .populate('cart.items.productId')
        .exec(function(err, user) {
            if (err || !user) {
                console.log('Error in retrieving user cart!');
                return res.redirect('back');
            }

            // Create the order object using the cart items
            const order = new Order({
                custId: req.user._id,
                items: user.cart.items.map(item => {
                    return {
                        productId: item.productId._id,
                        qty: item.qty
                    };
                }),
                phone: req.body.phone,
                address: req.body.address
            });

            // Save the order to the database
            order.save(err => {
                if (err) {
                    console.log('Error in creating the order!');
                    return res.redirect('back');
                }
                req.flash('success','Order Successfully Placed!');
                console.log('***', order);
                return res.redirect('back');
            });
        });
};

exports.checkOut = (req, res, next) => {
    if(req.user){
        req.user
        .populate('cart.items.productId')
        .then(user => {
            res.render('checkout', { cart: user.cart, title: 'Checkout'});
        })
        .catch(err => console.log(err));
    }
    else{
        req.flash('error','please Sign In first!');
        res.redirect('back');
    }
}

exports.myOrder = async (req, res) => {
    try {
        const orders = await Order.find({ custId: req.user._id }).populate({
            path: 'items.productId',
            select: 'price desc imagePath',
            model: Product
        }).exec();
        res.render('myorders', { orders: orders, title: 'MY ORDERS' });
    } catch (err) {
        console.log('Error in retrieving orders!', err);
        res.redirect('back');
    }
};

exports.myOrderDetails = async (req, res) => {
    try {
      const orderId = req.params.id; // Get the order ID from the request parameters
      const order = await Order.findById(orderId).populate('items.productId').exec(); // Find the order and populate the product details
  
      if (!order) {
        return res.status(404).send('Order not found'); // If the order doesn't exist, return a 404 error
      }
      res.render('orderdetails', { order:order, title:'Details' }); // Render the 'order-details' EJS template with the order details
    } catch (err) {
      console.log('Error retrieving order details:', err);
      res.status(500).send('Internal Server Error');
    }
  };