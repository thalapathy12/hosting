const Lead = require('../models/lead');

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, assignedTo: req.user._id });
    res.status(201).json({ success: true, lead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate('assignedTo', 'name role');
    res.status(200).json({ success: true, leads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, lead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.convertToClient = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    lead.status = 'Converted';
    await lead.save();

    // Optional: Create new Client entry, if you have a Client model
    res.status(200).json({ success: true, message: 'Lead converted', lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    res.status(200).json({ success: true, message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const lead = await Lead.findByIdAndUpdate(id, updatedData, { new: true });

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({ success: true, lead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
