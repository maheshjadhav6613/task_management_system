const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  description: { type: String, required: true },
});

const Roles = mongoose.model('Roles', RoleSchema);

module.exports = Roles;
 