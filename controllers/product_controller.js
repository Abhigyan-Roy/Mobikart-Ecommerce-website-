const Product=require('../models/product');
const User = require('../models/user');
const Detail=require('../models/prodetails');
const Publishable_Key = 'pk_test_51LWOEuSGMtzrB9e9nndOhmStMAuLvn5yRN2gzd02QDkkXWPi2T38t7mDTb9Y5ggw4DchTjGeorTzKqiPKV3OkNAL00lQgSQrba';

//it controls the add to cart function for a user
exports.addToCart = (req, res, next) => {
    if(req.user){
        req.user.addCart(req.params.id)
        .then(() => {
            res.redirect('back');
        }).catch(err => console.log(err));
    }
    else{
        req.flash('error','please Sign In first!');
        res.redirect('back');
    }
    
}

//to connect the payment gateway of stripe
module.exports.paymentgate = function(req, res){
    req.user
        .populate('cart.items.productId')
        .then(user => {
            res.render('payment', { cart: user.cart, key: Publishable_Key});
        })
        .catch(err => console.log(err));
}

//to provide extra details about the payment session 
module.exports.paymoney= function(req, res){
 
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
    if(req.user){
        req.user
        .populate('cart.items.productId')
        .then(user => {
            res.render('cart', { cart: user.cart, title: 'Shopping Cart Detail'});
        })
        .catch(err => console.log(err));
    }
    else{
        req.flash('error','please Sign In first!');
        res.redirect('back');
    }
        
}

//to show all the products entered till now(used in admin's page)
module.exports.productShow= function(req, res){
    Product.find({}, function(err, products){
        if(err){
            console.log("error in fetching");
            return;
        }
        return res.render('phonebycompany',{
            title: "Shopping cart",
            products: products
        });

    })
}
module.exports.showDetails= function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log("error in fetching details");
            return;
        }
        return res.render('detailedpro',{
            title: "Product Details",
            product: product
        });

    })
}

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
module.exports.adminpage=function(req, res){
    Product.find({}, function(err, products){
        if(err){
            console.log("error in fetching");
            return;
        }
        return res.render('admin',{
            products: products
        });

    })
}

//to create or add a new product to database 
module.exports.create= function(req, res){
    Product.create({
        imagePath: req.body.imagePath,
        brand: req.body.brand,
        storage: req.body.storage,
        ram: req.body.ram,
        desc: req.body.desc,
        mrp: req.body.mrp,
        price: req.body.price
    }, function(err, product){
        if(err){console.log('Error in creating a product!')
            return;}
            console.log('***', product);
            return res.redirect('back');
    });
}
module.exports.editdetails=function(req, res){
    Product.findById(req.params.id,function(err, product){
        if(product){
            Detail.create({
                imageRoute:req.body.imageRoute,
                frontcam:req.body.frontcam,
                rearcam:req.body.rearcam,
                Android:req.body.Android,
                battery:req.body.battery,
                processor:req.body.processor,
                product:req.params.id
            },function(err, detail){
                if(err){console.log('Error in updating details!')
                    return;}
                    console.log('***', detail);
                    return res.redirect('back');
            });
        }
    });
}
//to delete a product from database
module.exports.destroy=function(req,res){
    Product.findById(req.params.id, function(err, product){
        if(err){return;}
        product.remove();
        return res.redirect('back');
    });
}

//used to render company wise products
module.exports.company= function(req, res){
    if(req.user)
    {
        Product.find({'brand':req.params.company}, function(err, products){
            if(err){
                console.log("error in fetching");
                return;
            }
            return res.render('phonebycompany',{
                title: "STORE",
                products: products,
                cart: req.user.cart
            });
    
        })
    }
    else{
        Product.find({'brand':req.params.company}, function(err, products){
            if(err){
                console.log("error in fetching");
                return;
            }
            return res.render('phonebycompany',{
                title: "STORE",
                products: products
            });
    
        })
    }
}