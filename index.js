const express=require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7500;
const path=require('path');
const expressLayouts = require('express-ejs-layouts');
//used to connect the database
const db = require('./config/mongoose');

//using say.js
const say = require('say');

//used to create express-session
const session = require('express-session');

//used to include mongo-store for longer session
const MongoDbStore = require('connect-mongo');

//used to include passport local authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//used for flash messages
const flash=require('connect-flash');
const customMware=require('./config/middleware');

//used for google authentication(google-oauth)
const passportGoogle=require('./config/passport-oauth-google');

//used for stripe payment gateway
const Publishable_Key = 'pk_test_51LWOEuSGMtzrB9e9nndOhmStMAuLvn5yRN2gzd02QDkkXWPi2T38t7mDTb9Y5ggw4DchTjGeorTzKqiPKV3OkNAL00lQgSQrba';
const Secret_Key = 'sk_test_51LWOEuSGMtzrB9e9Dlhr7mafNeqhT3pUxLU4AOSOBlfZUTz5tWzQ6F4VuuFGBLiAM3dIkVmF8xBUN8UqQzy2Z7LK00MoPaWsI9';
const stripe = require('stripe')(Secret_Key);

//used to setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(express.urlencoded());

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(
    session({
        secret: 'Ecommerce',
        resave: false,
        saveUninitialized: false,
        store: MongoDbStore.create({
            mongoUrl: 'mongodb://localhost/MobiKart_db'
        })
    })
);
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
