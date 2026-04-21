const Partner = require("../models/Partner");

exports.createPartner = async (req, res) => {
  try {
    const {
      organizationName,
      contactPerson,
      email,
      phone,
      partnershipType,
      message,
      contributionType
    } = req.body;

    // Validate required fields
    if (
      !organizationName ||
      !contactPerson ||
      !email ||
      !phone ||
      !partnershipType ||
      !message ||
      !contributionType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newPartner = await Partner.create({
      organizationName,
      contactPerson,
      email,
      phone,
      partnershipType,
      message,
      contributionType
    });

    res.status(201).json({
      success: true,
      message: "Partner request submitted successfully",
      data: newPartner
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};