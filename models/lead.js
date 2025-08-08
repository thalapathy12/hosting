const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  company: String,
  source: { type: String, enum: ['Web', 'Call', 'Event', 'Email', 'Other'], default: 'Web' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  interactions: [
    {
      date: { type: Date, default: Date.now },
      type: { type: String },
      message: String
    }
  ],
  status: {
    type: String,
    enum: ['New', 'Qualified', 'Contacted', 'Converted', 'Lost', 'Rejected', 'OnHold'],
    default: 'New'
  },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);