const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
    type: { type: String, enum: ["Primary", "Secondary"], default: "Primary" },
    position: { type: String },
    department: { type: String },
    linkedTo: {
        kind: { type: String, enum: ["Lead", "Client"], required: true },
        item: { type: mongoose.Schema.Types.ObjectId, refPath: "linkedTo.kind", required: true }
    },
    communicationHistory: [{
        date: { type: Date, default: Date.now },
        method: { type: String, enum: ["Call", "Email", "Meeting", "WhatsApp"] },
        notes: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
