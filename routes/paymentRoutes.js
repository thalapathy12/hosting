const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/',authenticate, authorizeRoles('Admin', 'Super_admin'),paymentController.createPayment);
router.get('/',paymentController.getPayments);
router.put('/:id',paymentController.updatePayments);
router.delete('/:id',paymentController.deletePayment);


module.exports = router;
