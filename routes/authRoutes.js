const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/id/:id', authenticate, authController.getUserById);
router.get('/name/:name', authenticate, authController.getUsersByName);
router.get('/role/:role', authenticate, authorizeRoles('Super_admin', 'Admin'), authController.getUsersByRole);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
