  // statusController.js
const Status = require("../models/statusModal"); // Adjust the path as necessary

// Create a new status
exports.createStatus = async (req, res) => {
  try {
    const status = new Status(req.body);
    await status.save();
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all statusesexports.getStatuses = async (req, res) => {
  exports.getStatuses = async (req, res) => {
    try {
      const statuses = await Status.find().sort({ order: 1 }); // Sort by order
      res.status(200).json(statuses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
exports.getStatusById = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a status by ID
exports.updateStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a status by ID
exports.deleteStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndDelete(req.params.id);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
