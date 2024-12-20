const express = require('express');
const multer = require('multer');
const Task = require('../models/Tasks');  // Import Task model
const taskController = require('../controller/taskController');  // Import the controller

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Set the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Create a unique filename
  }
});

const upload = multer({ storage });

// POST request to save a task (including file upload)
router.post('/', upload.single('attachments'), taskController.createTask);

// GET request to get all tasks
router.get('/', taskController.getTasks);

// GET request to get a task by ID
router.get('/:id', taskController.getTaskById);

// PUT request to update a task
router.put('/:id', taskController.updateTask);

// DELETE request to delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
