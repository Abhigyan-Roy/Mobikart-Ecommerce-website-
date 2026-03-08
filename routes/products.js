const express = require('express');
const router = express.Router();
const { validateBody } = require('../middleware/validate');
const { productCreateSchema, productUpdateSchema } = require('../validations/schemas');

const proController = require('../controllers/product_controller');

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();

function checkAdminAccess(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }

    const signedInEmail = (req.user && req.user.email ? req.user.email : '').toLowerCase();
    if (signedInEmail !== ADMIN_EMAIL) {
        if (req.flash) {
            req.flash('error', 'You are not authorized to access admin dashboard.');
        }
        return res.redirect('/');
    }

    return next();
}

router.get('/', proController.productShow);
router.get('/aboutus', proController.aboutUs);
router.get('/admin', checkAdminAccess, proController.adminpage);
router.post('/admin/updateProduct/:id', checkAdminAccess, validateBody(productUpdateSchema), proController.updProd);
router.get('/admin/orders', checkAdminAccess, proController.adminOrder);
router.post('/admin/update', checkAdminAccess, proController.updOrder);
router.post('/create', checkAdminAccess, validateBody(productCreateSchema), proController.create);
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
router.get('/delete/:id', checkAdminAccess, proController.destroy);
router.get('/edit/:id', checkAdminAccess, proController.editProd);
router.get('/:company', proController.company);
module.exports = router;
