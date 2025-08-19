const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  project: { type: String, required: true },
  paymentType: { type: String, enum: ['Milestone Payment', 'Support Payment'], required: true },
  amount: { type: Number, required: true },
  percentage: { type: Number },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Not Due', 'Due', 'Paid', 'Invoiced'], default: 'Not Due' },
  paidDate: { type: Date },
  invoiceNumber: { type: String },
  milestone: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);