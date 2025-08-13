const express = require("express");
const router = express.Router();
const {
    createContact,
     getContacts,
     getContactById,
    updateContact,
    deleteContact
}
=require("../controllers/contactController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Create Contact (Admin & SuperAdmin)
router.post("/", authenticate, authorizeRoles("Admin", "Super_admin"), createContact);

// Get All Contacts
router.get("/", authenticate, authorizeRoles("Admin", "Super_admin"), getContacts);

// Get Single Contact
router.get("/:id", authenticate, authorizeRoles("Admin", "Super_admin"),getContactById);

// Update Contact
router.put("/:id", authenticate, authorizeRoles("Admin", "Super_admin"), updateContact);

// Delete Contact
router.delete("/:id", authenticate, authorizeRoles("Admin", "Super_admin"), deleteContact);

module.exports = router;
