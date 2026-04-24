const Donation = require("../models/Donation");

// ✅ CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const { name, phone, amount, paymentId } = req.body;

if (!name || !phone || !amount || isNaN(amount)) {
  return res.status(400).json({
    success: false,
    message: "Valid name, phone and amount are required"
  });
}

    const newDonation = await Donation.create({
  name,
  phone,
  amount,
  paymentId: paymentId || null,
  status: "pending"
});

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      data: newDonation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ GET ALL DONATIONS
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: donations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ GET SINGLE DONATION
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      data: donation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ UPDATE STATUS (VERIFY PAYMENT)
exports.updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: donation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ FILTER BY STATUS (pending / verified)
exports.getDonationsByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    const donations = await Donation.find({ status }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: donations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ DELETE DONATION
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Donation deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};