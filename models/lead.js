const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadId: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  clientId: { type: String },
  spocName: { type: String },
  spocEmail: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  referrer: {
    type: { type: String, enum: ['person', 'company'], required: true },
    name: { type: String },
    contact: { type: String },
    details: { type: String }
  },
  attachments: [{ fileName: String, fileUrl: String }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Lead', leadSchema);
