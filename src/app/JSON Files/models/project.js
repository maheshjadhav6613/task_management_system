const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  color: { type: String },
  users: { type: [String] }, // Array of user IDs or usernames associated with the project
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
