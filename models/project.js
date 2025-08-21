const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  projectId: { type: String, required: true, unique: true },
  client: { type: String, required: true },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "On Hold", "Cancelled"],
    default: "Not Started"
  },
  deadline: { type: Date, required: true },
  budget: { type: Number },
  description: { type: String },
  scopeOfWork: { type: String },
  notes: { type: String },
  tags: [{ type: String }],
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  projectObjective: { type: String },
  milestones: [{
    title: String,
    dueDate: Date,
    completed: { type: Boolean, default: false }
  }],
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  clientInfo: {
    name: String,
    spocName: String,
    spocEmail: String,
    clientId: String
  },
  createdBy: {
    name: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);