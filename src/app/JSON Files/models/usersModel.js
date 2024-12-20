const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prefix: { type: String, required: true },
  salary: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  project: { type: String, required: true },
  role: { type: String, required: true},
  attachment: { type: String }, // URL or file path
  status: { type: Boolean, required: true},
  permissions: {
    task: { type: Boolean, default: false },
    project: { type: Boolean, default: false },
    users: { type: Boolean, default: false },
    calendars: { type: Boolean, default: false },
    roles: { type: Boolean, default: false }
  },

});

module.exports = mongoose.model('User', userSchema);
