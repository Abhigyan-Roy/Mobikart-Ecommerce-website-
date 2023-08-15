const Product = require('../models/product');
const User = require('../models/user');
const Publishable_Key = 'pk_test_51LWOEuSGMtzrB9e9nndOhmStMAuLvn5yRN2gzd02QDkkXWPi2T38t7mDTb9Y5ggw4DchTjGeorTzKqiPKV3OkNAL00lQgSQrba';
const Order = require('../models/order');
exports.aboutUs = (req, res) => {
    res.render('about',{cart: req.user.cart});
}
//it controls the add to cart function for a user
exports.addToCart = (req, res, next) => {
    if (req.user) {
        req.user.addCart(req.params.id)
            .then(() => {
                res.redirect('back');
            }).catch(err => console.log(err));
    }
    else {
        req.flash('error', 'please Sign In first!');
        res.redirect('back');
    }

}

//to connect the payment gateway of stripe
module.exports.paymentgate = function (req, res) {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            res.render('payment', { cart: user.cart, key: Publishable_Key });
        })
        .catch(err => console.log(err));
}

//to provide extra details about the payment session 
module.exports.paymoney = function (req, res) {
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: req.body.user.name
    })
        .then((customer) => {

            return stripe.charges.create({
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success") // If no error occurs
        })
        .catch((err) => {
            res.send(err)    // If some error occurs
        });
}

// to delete products from cart of a user
exports.deleteCart = (req, res, next) => {
    req.user.removeFromCart(req.params.id)
        .then(() => {
            res.redirect('back');
        }).catch(err => console.log(err));
}

//to show the cart on clicking the cart option
exports.showCart = (req, res, next) => {
    if (req.user) {
        req.user
            .populate('cart.items.productId')
            .then(user => {
                res.render('cart', { cart: user.cart, title: 'Shopping Cart Detail' });
            })
            .catch(err => console.log(err));
    }
    else {
        req.flash('error', 'please Sign In first!');
        res.redirect('back');
    }

}

//to show all the products entered till now
module.exports.productShow = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            console.log("error in fetching");
            return;
        }
        return res.render('phonebycompany', {
            title: "Shopping cart",
            products: products
        });

    })
}


module.exports.compare = function (req, res) {
    Product.find({}, function (err, products) {
        const product1 = req.body.product1;
        const product2 = req.body.product2;
        const product1Index = products.findIndex(product => product.id === product1);
        const product2Index = products.findIndex(product => product.id === product2);
        res.render('compare', {
            products: products,
            product1: product1,
            product2: product2,
            product1Index: product1Index,
            product2Index: product2Index,
            cart: req.user.cart
        });
    })

}


module.exports.showDetails = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .populate('ratings')
            .exec();
        const totalRatings = product.ratings.length;
        let avgRating = 0;
        if (totalRatings > 0) {
            const sumRatings = product.ratings.reduce((sum, rating) => sum + rating.rating, 0);
            avgRating = Math.round(sumRatings / totalRatings);
        }

        res.render('detailedpro', {
            title: "Product Details",
            product: product,
            avgRating: avgRating,
            cart: req.user.cart
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};
//to increase quantity of a item in cart
exports.increase = (req, res, next) => {
    req.user.increaseQty(req.params.id)
        .then(() => {
            res.redirect('back');
        }).catch(err => console.log(err));
}

//to decrease quantity of a item in cart
exports.decrease = (req, res, next) => {
    req.user.decreaseQty(req.params.id)
        .then(() => {
            res.redirect('back');
        }).catch(err => console.log(err));
}

//to render the admin's page
module.exports.adminpage = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            console.log("error in fetching");
            return;
        }
        return res.render('admin', {
            products: products
        });

    })
}
module.exports.updProd = function (req, res) {
    const id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err) {
            console.log(err);
            res.redirect('/cart/admin');
        } else {
            product.imagePath = req.body.imagePath;
            product.bigImg = req.body.bigImg;
            product.frontcam = req.body.frontcam;
            product.rearcam = req.body.rearcam;
            product.Android = req.body.Android;
            product.seller = req.body.seller;
            product.battery = req.body.battery;
            product.processor = req.body.processor;
            product.brand = req.body.brand;
            product.color = req.body.color;
            product.storage = req.body.storage;
            product.ram = req.body.ram;
            product.desc = req.body.desc;
            product.longdesc = req.body.longdesc;
            product.mrp = req.body.mrp;
            product.price = req.body.price;
            product.binkies = req.body.binkies;
            product.save((err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/cart/admin');
            });
        }
    });
}
module.exports.editProd = function (req, res) {
    Product.findById(req.params.id).populate('ratings').populate('comments').exec((err, product) => {
        if (err) {
            console.log(err);
            res.redirect('/error');
        } else {
            res.render('updateProduct', { product: product });
        }
    });
}
module.exports.adminOrder = function (req, res) {
    Order.find().populate({
        path: 'items.productId',
        select: 'price desc imagePath',
        model: Product
    }).exec(function (err, orders) {
        if (err) {
            console.log('Error in retrieving orders!', err);
            return res.redirect('back');
        }
        res.render('adminorders', { orders: orders, title: 'Admin Panel' });
    });
}
module.exports.updOrder = function (req, res) {
    const orderId = req.body.orderId;
    const status = req.body.status;
    Order.findByIdAndUpdate(orderId, { status: status }, function (err, order) {
        if (err) {
            console.log('Error in updating order status!', err);
            return res.redirect('/cart/admin/orders');
        }
        req.flash('success', 'Updated!');
        res.redirect('/cart/admin/orders');
    });
}
//to create or add a new product to database 
module.exports.create = function (req, res) {
    Product.create({
        imagePath: req.body.imagePath,
        bigImg: req.body.bigImg,
        frontcam: req.body.frontcam,
        rearcam: req.body.rearcam,
        Android: req.body.Android,
        seller: req.body.seller,
        battery: req.body.battery,
        processor: req.body.processor,
        brand: req.body.brand,
        color: req.body.color,
        storage: req.body.storage,
        ram: req.body.ram,
        desc: req.body.desc,
        longdesc: req.body.longdesc,
        mrp: req.body.mrp,
        price: req.body.price
    }, function (err, product) {
        if (err) {
            console.log('Error in creating a product!')
            return;
        }
        console.log('***', product);
        return res.redirect('back');
    });
}

//to delete a product from database
module.exports.destroy = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) { return; }
        product.remove();
        return res.redirect('back');
    });
}

//used to render company wise products
module.exports.company = function (req, res) {
    if (req.user) {
        Product.find({ 'brand': req.params.company }, function (err, products) {
            if (err) {
                console.log("error in fetching");
                return;
            }
            return res.render('phonebycompany', {
                title: "STORE",
                products: products,
                cart: req.user.cart
            });

        })
    }
    else {
        Product.find({ 'brand': req.params.company }, function (err, products) {
            if (err) {
                console.log("error in fetching");
                return;
            }
            return res.render('phonebycompany', {
                title: "STORE",
                products: products
            });

        })
    }
}

