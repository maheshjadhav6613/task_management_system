// // models/task.js
// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   status: {
//     type: String,
//     enum: ['To-Do', 'In Progress', 'Done', 'Pending'],
//     default: 'To-Do',
//   },
//   attachments: { type: String }, // Optional field for file attachment
// }, { timestamps: true });

// const Tasks = mongoose.model('Tasks', taskSchema);

// module.exports = Tasks;

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Done', 'Pending'],
    default: 'To-Do',
  },
  attachments: { type: String }, // Optional field for file attachment
}, { timestamps: true });

// Check if the model already exists before defining it
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;





