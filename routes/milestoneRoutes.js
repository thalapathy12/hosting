const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');
const { authenticate } = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

router.post(
  '/',
  authenticate,
  authorizeRoles('Admin', 'Super_admin'),
  milestoneController.createMilestone
);

router.get('/', authenticate, milestoneController.getAllMilestones);

router.get('/:id', authenticate, milestoneController.getMilestoneById);

router.put(
  '/:id',
  authenticate,
  authorizeRoles('Admin', 'Super_admin'),
  milestoneController.updateMilestone
);

router.delete(
  '/:id',
  authenticate,
  authorizeRoles('Super_admin'),
  milestoneController.deleteMilestone
);

module.exports = router;
