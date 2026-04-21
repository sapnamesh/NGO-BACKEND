const express = require("express");
const router = express.Router();

const {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getDonationsByStatus
} = require("../controllers/donationController");

// CREATE
router.post("/", createDonation);

// READ
router.get("/", getAllDonations);
router.get("/filter/status", getDonationsByStatus);
router.get("/:id", getDonationById);

// UPDATE
router.put("/:id", updateDonationStatus);

// DELETE
router.delete("/:id", deleteDonation);

module.exports = router;