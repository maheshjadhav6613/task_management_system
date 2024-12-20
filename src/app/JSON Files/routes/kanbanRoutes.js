// // routes/kanbanRoutes.js
// const express = require('express');
// const router = express.Router();
// const taskController = require('../controller/kanbanController');

// // POST: Create a new task
// router.post('/tasks', taskController.createTask);

// // GET: Fetch all tasks (only title, description, and status)
// router.get('/tasks', taskController.getTasks);

// // GET: Fetch a specific task by ID (only title, description, and status)
// router.get('/tasks/:id', taskController.getTaskById);

// // PUT: Update a task's status or other details
// router.put('/tasks/:id', taskController.updateTask);

// // DELETE: Delete a task by ID
// router.delete('/tasks/:id', taskController.deleteTask);

// module.exports = router;


const express = require('express');
const router = express.Router();
const kanbanController = require('../controller/kanbanController');
const statusController = require('../controller/statusController');

// GET: Fetch all tasks
router.get('/tasks', kanbanController.getTasks);

// POST: Create a new task
router.post('/tasks', kanbanController.createTask);

// PUT: Update a task's status
router.put('/tasks/:id', kanbanController.updateTask);

// DELETE: Delete a task
router.delete('/tasks/:id', kanbanController.deleteTask);

// GET: Fetch all statuses (for Kanban columns)
router.get('/kanban', statusController.getStatusesWithTasks);
module.exports = router;
