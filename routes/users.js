const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
router.get('/profile', passport.checkAuthentication, usersController.profile);

router.post('/create', usersController.create);

router.get('/sign-up', usersController.signup);

router.get('/sign-in', usersController.signin);

router.get('/editpro/:id', usersController.editProfile);
router.post('/update/:id', usersController.update);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate( 'google', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/sign-in'
}),usersController.createSession);
router.get('/sign-out', usersController.destroySession);

module.exports = router;