const mongoose = require('mongoose');
const Product=require('../models/product');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        default: "N/A"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male"
    },
    dateOfBirth: {
        type: Date,
        default: new Date("1970-01-01")
    },
    phoneNumber: {
        type: String,
        default: "0000000000"
    },
    address: {
        type: String,
        default: "N/A"
    },
    avatar: {
        type: String,
        default:"https://imgs.search.brave.com/FrjknLEFfRY9CepUgm1ImDKqj8lF3wVf5egvCuiYEzs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzE4LzAxLzk4/LzM2MF9GXzExODAx/OTgyMl82Q0tYUDZy/WG1WaERPemJYWmxM/cUVNMnlhNEhoWXpT/Vi5qcGc"
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: Number
    }
}, {
    timestamps: true
});

userSchema.methods.addCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        const cart = this.cart;
        const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            cart.items[isExisting].qty += 1;
        } else {
            cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!cart.totalPrice) {
            cart.totalPrice = 0;
        }
        cart.totalPrice += product.price;
        return this.save();
    }

}
userSchema.methods.increaseQty = async function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        const prod= await Product.findById(productId);
        while(cart.items[isExisting].qty<10){
            cart.items[isExisting].qty += 1;
            cart.totalPrice+=prod.price;
            return this.save();
        }
        
    }
}
userSchema.methods.decreaseQty = async function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        const prod= await Product.findById(productId);
        while(cart.items[isExisting].qty>1){
            cart.items[isExisting].qty -= 1;
            cart.totalPrice-=prod.price;
            return this.save();
        }
    }
}

userSchema.methods.removeFromCart = async function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        const prod= await Product.findById(productId);
        cart.totalPrice-=prod.price*cart.items[isExisting].qty;
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;