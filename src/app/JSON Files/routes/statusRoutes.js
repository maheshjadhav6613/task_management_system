// statusRoutes.js
const express = require("express");
const router = express.Router();
const statusController = require("../controller/statusController"); // Adjust the path as necessary

// Create a new status
router.post("/", statusController.createStatus);

// Get all statuses
router.get("/", statusController.getStatuses);

// Get a single status by ID
router.get("/:id", statusController.getStatuses);

// Update a status by ID
router.patch("/:id", statusController.updateStatus);

// Delete a status by ID
router.delete("/:id", statusController.deleteStatus);

module.exports = router;
