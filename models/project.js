const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  status: { type: String, enum: ['Active', 'Completed', 'On Hold'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);