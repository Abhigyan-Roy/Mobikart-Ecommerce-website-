const express = require('express');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const app = express();
const config = require('./config/app-config');
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
const { helmetMiddleware, authLimiter, paymentLimiter } = require('./config/security');

//used for google authentication(google-oauth)
const passportGoogle = require('./config/passport-oauth-google');

app.use(express.urlencoded({ extended: true }));
app.use(helmetMiddleware);

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(config.assetPath));

app.use(expressLayouts);
app.use(logger(config.morgan.mode, config.morgan.options));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/uploads', express.static(__dirname + '/uploads'));
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

const sessionConfig = {
    secret: config.sessionCookie,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

try {
    if (config.sessionStore === 'mongo') {
        const mongoSessionStore = MongoDbStore.create({
            mongoUrl: config.db,
            mongoOptions: {
                serverSelectionTimeoutMS: 5000
            }
        });
        mongoSessionStore.on('error', function (err) {
            console.error('Session store MongoDB error:', err && err.message ? err.message : err);
        });
        if (mongoSessionStore.clientP && typeof mongoSessionStore.clientP.catch === 'function') {
            mongoSessionStore.clientP.catch((err) => {
                console.error('Session store MongoDB client connection failed:', err && err.message ? err.message : err);
            });
        }
        sessionConfig.store = mongoSessionStore;
    } else {
        console.log('Using in-memory session store. Set SESSION_STORE=mongo to persist sessions in MongoDB.');
    }
} catch (err) {
    console.error('Failed to initialize MongoDB session store, using memory store:', err && err.message ? err.message : err);
}

app.use(session(sessionConfig));
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/users/create', authLimiter);
app.use('/users/create-session', authLimiter);
app.use('/users/auth/google', authLimiter);
app.use('/cart/pay', paymentLimiter);
app.use('/cart/payment', paymentLimiter);
app.use('/', require('./routes'));

const { Server } = require('socket.io');
const serverSide = require('./config/chat_sockets');
const io = new Server(httpServer, {
    cors: {
        origin: "https://mobicart-b79g.onrender.com"
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
