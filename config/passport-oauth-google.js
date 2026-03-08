const passport=require('passport');
const googleStrategy=require( 'passport-google-oauth2' ).Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const config = require('./app-config');

if (config.googleClientId && config.googleClientSecret) {
    passport.use(new googleStrategy({
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackUrl
    },
    function(accessToken, refreshToken, profile, done){

        User.findOne({email:profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in oauth services', err); return;}

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err, user){
                    if(err){console.log('error in oauth services', err); return;}
                    return done(null ,user);
                });
            }
        });
    }
    ));
} else {
    console.warn('Google OAuth disabled: set CLIENT_ID and CLIENT_SECRET in .env to enable it.');
}
module.exports=passport;
