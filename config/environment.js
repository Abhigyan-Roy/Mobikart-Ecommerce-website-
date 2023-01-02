require("dotenv").config();
const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDir=path.join(__dirname,'../prod_logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir);
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDir
  });
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie: 'Ecommerce',
    db:'mongodb://localhost/MobiKart_db',
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'abhigyan.roy.cse24@heritageit.edu.in',
            pass: 'hWvB9QDd'
        }
    },
    google_client_ID: "921041655166-8cs7delcn145s87ac79n6v6fasfhf4jn.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_callback_URL: "http://localhost:7500/users/auth/google/callback",
    morgan:{
        mode:'dev',
        options: {stream: accessLogStream}
    }
}
const production={
    name:'production',
    asset_path: process.env.ASSET,
    session_cookie: process.env.SESSION_COOKIE,
    db: process.env.DB_NAME,
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    },
    google_client_ID: process.env.CLIENT_ID,
    google_client_Secret: process.env.CLIENT_SECRET,
    google_callback_URL: process.env.CALL_BACK,
    morgan:{
        mode:'combined',
        options: {stream: accessLogStream}
    }
}
module.exports=eval(process.env.ENVIRONMENT)==undefined ? development:eval(process.env.ENVIRONMENT);