const express = require('express');
const router = express.Router();

const proController = require('../controllers/product_controller');

router.get('/', proController.productShow);
router.get('/aboutus', proController.aboutUs);
router.get('/admin', proController.adminpage);
router.post('/admin/updateProduct/:id', proController.updProd);
router.get('/admin/orders', proController.adminOrder);
router.post('/admin/update', proController.updOrder);
router.post('/create',proController.create);
router.post('/add-to-cart/:id', proController.addToCart);
router.get('/increase/:id', proController.increase);
router.get('/decrease/:id', proController.decrease);
router.post('/delete-cart/:id', proController.deleteCart);
router.get('/showdetails/:id',proController.showDetails);
router.get('/show', proController.showCart);
router.get('/compare', proController.compare);
router.post('/compare', proController.compare);
router.get('/pay', proController.paymentgate);
router.get('/payment', proController.paymoney);
router.get('/delete/:id',proController.destroy);
router.get('/edit/:id',proController.editProd);
router.get('/:company', proController.company);
module.exports = router;