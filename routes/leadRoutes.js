const express = require('express');
const router = express.Router();
const {
  createLead,
  getAllLeads,
  updateLeadStatus,
  convertToClient
} = require('../controllers/leadController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/create', protect, authorizeRoles('Admin', 'SuperAdmin'), createLead);
router.get('/', protect, authorizeRoles('Admin', 'SuperAdmin', 'Client'), getAllLeads);
router.patch('/:id/status', protect, authorizeRoles('Admin', 'SuperAdmin'), updateLeadStatus);
router.post('/:id/convert', protect, authorizeRoles('Admin', 'SuperAdmin'), convertToClient);

module.exports = router;