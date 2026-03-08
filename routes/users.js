const express = require('express');
const router = express.Router();
const passport = require('passport');
const { validateBody } = require('../middleware/validate');
const { signupSchema, signinSchema } = require('../validations/schemas');

const usersController = require('../controllers/users_controller');
const passportCheck = passport.checkAuthentication;

router.get('/profile', passportCheck, usersController.profile);
router.get('/wishlist', passportCheck, usersController.wishlist);
router.post('/wishlist/add/:id', passportCheck, async (req, res) => {
  try {
    await req.user.addToWishlist(req.params.id);
    req.flash('success', 'Added to wishlist');
  } catch (e) {
    console.log(e);
    req.flash('error', 'Unable to add to wishlist');
  }
  return res.redirect('back');
});

router.post('/wishlist/remove/:id', passportCheck, async (req, res) => {
  try {
    await req.user.removeFromWishlist(req.params.id);
    req.flash('success', 'Removed from wishlist');
  } catch (e) {
    console.log(e);
    req.flash('error', 'Unable to remove from wishlist');
  }
  return res.redirect('back');
});

router.post('/create', validateBody(signupSchema), usersController.create);

router.get('/sign-up', usersController.signup);

router.get('/sign-in', usersController.signin);

router.get('/editpro/:id', usersController.editProfile);
router.post('/update/:id', usersController.update);

router.post('/create-session', validateBody(signinSchema), passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

const hasGoogleStrategy = typeof passport._strategy === 'function' && !!passport._strategy('google');

if (hasGoogleStrategy) {
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/sign-in'
  }), usersController.createSession);
} else {
  router.get('/auth/google', (req, res) => {
    if (req.flash) {
      req.flash('error', 'Google OAuth is not configured yet.');
    }
    return res.redirect('/users/sign-in');
  });
}
router.get('/sign-out', usersController.destroySession);

module.exports = router;
