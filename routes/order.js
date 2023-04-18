const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');
router.post('/create',orderController.createOrder);
router.get('/checkout',orderController.checkOut);
router.get('/myorder',orderController.myOrder);
router.get('/details/:id',orderController.myOrderDetails);
module.exports=router;