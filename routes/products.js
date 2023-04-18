const express = require('express');
const router = express.Router();

const proController = require('../controllers/product_controller');

router.get('/', proController.productShow);
router.get('/aboutus', proController.aboutUs);
router.get('/admin', proController.adminpage);
router.get('/admin/orders', proController.adminOrder);
router.post('/admin/update', proController.updOrder);
router.post('/create',proController.create);
router.post('/add-to-cart/:id', proController.addToCart);
router.get('/increase/:id', proController.increase);
router.get('/decrease/:id', proController.decrease);
router.post('/delete-cart/:id', proController.deleteCart);
router.get('/showdetails/:id',proController.showDetails);
router.get('/show', proController.showCart);
router.get('/pay', proController.paymentgate);
router.get('/payment', proController.paymoney);
router.get('/delete/:id',proController.destroy);
router.get('/:company', proController.company);
module.exports = router;