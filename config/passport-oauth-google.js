const passport=require('passport');
const googleStrategy=require( 'passport-google-oauth2' ).Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_client_ID,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_callback_URL
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
module.exports=passport;