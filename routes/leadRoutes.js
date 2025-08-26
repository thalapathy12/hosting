const express = require('express');
const router = express.Router();
const {
  createLead,
  getAllLeads,
  updateLeadStatus,
  convertToClient,
  deleteClient
} = require('../controllers/leadController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorizeRoles} = require('../middleware/roleMiddleware');
router.post('/create', authenticate, authorizeRoles('Admin', 'Super_admin'), createLead);
router.get('/', authenticate, authorizeRoles('Admin', 'Super_admin', 'Member'), getAllLeads);
router.patch('/:id/status', authenticate, authorizeRoles('Admin', 'Super_admin'), updateLeadStatus);
router.post('/:id/convert', authenticate, authorizeRoles('Admin', 'Super_admin'), convertToClient);
router.delete('/:id', authenticate, authorizeRoles('Admin', 'Super_admin'), deleteClient);

module.exports = router;


