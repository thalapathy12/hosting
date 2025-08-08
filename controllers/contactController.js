const Contact = require("../models/contact");

// Create Contact
exports.createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().populate("linkedTo.item");
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Single Contact
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).populate("linkedTo.item");
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Contact
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
