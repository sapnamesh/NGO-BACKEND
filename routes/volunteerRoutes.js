const express = require("express");
const router = express.Router();

const { createVolunteer } = require("../controllers/volunteerController");

// POST - Submit volunteer form
router.post("/", createVolunteer);

module.exports = router;