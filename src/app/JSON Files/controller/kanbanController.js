const express = require('express');
const Task = require('../models/TaskModel'); // Adjust path as needed
const Status = require('../models/statusModal'); // Adjust path as needed

const router = express.Router();

// Get all statuses
router.get('/statuses', async (req, res) => {
  try {
    const statuses = await Status.find().sort({ order: 1 });
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tasks by status
router.get('/tasks', async (req, res) => {
  const { status } = req.query;
  try {
    const tasks = await Task.find({ status });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task status
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
