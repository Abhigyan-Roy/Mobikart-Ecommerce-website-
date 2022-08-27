const passport=require('passport');
const googleStrategy=require( 'passport-google-oauth2' ).Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID: "921041655166-8cs7delcn145s87ac79n6v6fasfhf4jn.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:7500/users/auth/google/callback"
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