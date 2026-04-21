const express = require("express");
const router = express.Router();

const { createPartner } = require("../controllers/partnerController");

// Create Partner Route
router.post("/", createPartner);

module.exports = router;