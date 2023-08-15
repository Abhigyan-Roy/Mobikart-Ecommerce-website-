const express = require('express');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const app = express();
const env = require('./config/environment');
const port = process.env.PORT || 7500;
const httpServer = require('http').createServer(app);
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
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
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//used for google authentication(google-oauth)
const passportGoogle = require('./config/passport-oauth-google');

//used for stripe payment gateway
const Publishable_Key = 'pk_test_51LWOEuSGMtzrB9e9nndOhmStMAuLvn5yRN2gzd02QDkkXWPi2T38t7mDTb9Y5ggw4DchTjGeorTzKqiPKV3OkNAL00lQgSQrba';
const Secret_Key = 'sk_test_51LWOEuSGMtzrB9e9Dlhr7mafNeqhT3pUxLU4AOSOBlfZUTz5tWzQ6F4VuuFGBLiAM3dIkVmF8xBUN8UqQzy2Z7LK00MoPaWsI9';
const stripe = require('stripe')(Secret_Key);

app.use(express.urlencoded());

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(env.asset_path));

app.use(expressLayouts);
app.use(logger(env.morgan.mode, env.morgan.options));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(
    session({
        secret: env.session_cookie,
        resave: false,
        saveUninitialized: false,
        store: MongoDbStore.create({
        mongoUrl: 'mongodb+srv://Abhigyan:25052002@cluster0.ekfswbx.mongodb.net/mobicart_db?retryWrites=true&w=majority'
         })
    })
);
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));

const { Server } = require('socket.io');
const serverSide = require('./config/chat_sockets');
const io = new Server(httpServer, {
    cors: {
        origin: "https://mobicart-fvd2.onrender.com"
    }
})
serverSide(io);



httpServer.listen(5000, () => {
    console.log('listening on chat server:5000');
});

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
