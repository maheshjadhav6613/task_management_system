const Roles = require('../models/roleModal');

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a role
const addRole = async (req, res) => {
  try {
    const newRole = new Roles(req.body);
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Roles.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Roles.findByIdAndDelete(id);
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllRoles, addRole, updateRole, deleteRole };
