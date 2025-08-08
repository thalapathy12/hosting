const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, trim: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String }
  },
  industry: { type: String, trim: true },
  associatedProjects: [
    {
      projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
      projectName: { type: String }
    }
  ],
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Overdue'],
    default: 'Pending'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },        // who created the client
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }   // who manages the client
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);