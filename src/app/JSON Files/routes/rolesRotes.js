const express = require('express');
const { getAllRoles, addRole, updateRole, deleteRole } = require('../controller/roleColtroller');

const router = express.Router();

router.get('/roles', getAllRoles);
router.post('/roles', addRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

module.exports = router;
