const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/", authenticate, authorizeRoles("Admin", "Super_admin"), createProject);
router.get("/", authenticate, authorizeRoles("Admin", "Super_admin"), getProjects);
router.get("/:id", authenticate, authorizeRoles("Admin", "Super_admin"), getProjectById);
router.put("/:id", authenticate, authorizeRoles("Admin", "Super_admin"), updateProject);
router.delete("/:id", authenticate, authorizeRoles("Admin", "Super_admin"), deleteProject);

module.exports = router;