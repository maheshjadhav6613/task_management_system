const Tasks = require('../models/TaskModel');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.attachments = req.file.path; // Save file path in the database
    }
    const task = new Tasks(data);
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find().populate('projectId').populate('assignedTo').populate('statusId');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    console.log(req.body);
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update task status when dragged to another column
exports.updateCardColumn = async (req, res) => {
  
  const { id } = req.params;
  const { statusId } = req.body;

  console.log(req.body);

  try {
    const card = await Tasks.findByIdAndUpdate(id, { statusId }, { new: true });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};





// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
