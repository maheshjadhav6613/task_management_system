const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController'); // Adjust the path as necessary

// Import middleware for file uploads (if applicable)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure multer storage if needed

// Task Routes
router.post('/', upload.single('attachments'), taskController.createTask); // Create a task
router.get('/', taskController.getTasks); // Get all tasks
router.get('/:id', taskController.getTaskById); // Get a specific task by ID
router.put('/:id', taskController.updateTask); // Update a task
router.post('/update-status/:id', taskController.updateCardColumn); // Update task status when dragged
router.delete('/:id', taskController.deleteTask); // Delete a task

// Update task status

module.exports = router;
