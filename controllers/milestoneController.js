const Milestone = require('../models/milestone');

exports.createMilestone = async (req, res) => {
  try {
    const milestone = new Milestone(req.body);
    await milestone.save();
    res.status(201).json({ message: 'Milestone created', milestone });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to create milestone', 
      details: err.message 
    });
  }
};

exports.getAllMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find();
    res.status(200).json(milestones);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch milestones', details: err.message });
  }
};

exports.getMilestoneById = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) return res.status(404).json({ error: 'Milestone not found' });
    res.status(200).json(milestone);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching milestone', details: err.message });
  }
};

exports.updateMilestone = async (req, res) => {
  try {
    const updated = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Milestone not found' });
    res.status(200).json({ message: 'Milestone updated', updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update milestone', details: err.message });
  }
};

exports.deleteMilestone = async (req, res) => {
  try {
    const deleted = await Milestone.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Milestone not found' });
    res.status(200).json({ message: 'Milestone deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete milestone', details: err.message });
  }
};
