const express = require('express');
const passport = require('passport');
const router = express.Router();
const rateController = require('../controllers/rate_controller');
router.post('/create/:id', passport.checkAuthentication,rateController.createRate);
module.exports=router;