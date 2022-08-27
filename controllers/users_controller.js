const User = require('../models/user');
const userMailer=require('../mailers/signup_mailer');

module.exports.profile = function(req, res){
        return res.render('profile', {
            title: 'User Profile'
        });
    };

module.exports.editProfile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('editprofile', {
            title: 'Edit your Profile',
            user: user
        });
    });
}

module.exports.update = async function(req, res){
        try{
            let user= await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('MULTER Error:', err);}
                user.name=req.body.name;
                if(req.file)
                {
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }  

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        req.flash('error','you are already logged in!');
        return res.redirect('/');
    }
    res.render('sign');
}
module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        req.flash('error','you are already logged in!');
        return res.redirect('/');
    }
    res.render('sign-in');
}

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','Passwords do not match!');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error','Something Wrong! please try again');
            console.log('error in finding user in signing up'); return;}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                req.flash('success','User successfully created!');
                userMailer.newSign(user);
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error','user already exists! please login');
            return res.redirect('back');
        }

    });
}

module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have logged out!');
        return res.redirect('/users/sign-in');
      });
    
}