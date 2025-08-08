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
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Create Contact (Admin & SuperAdmin)
router.post("/", protect, authorizeRoles("Admin", "SuperAdmin"), createContact);

// Get All Contacts
router.get("/", protect, authorizeRoles("Admin", "SuperAdmin"), getContacts);

// Get Single Contact
router.get("/:id", protect, authorizeRoles("Admin", "SuperAdmin"), getContactById);

// Update Contact
router.put("/:id", protect, authorizeRoles("Admin", "SuperAdmin"), updateContact);

// Delete Contact
router.delete("/:id", protect, authorizeRoles("Admin", "SuperAdmin"), deleteContact);

module.exports = router;
