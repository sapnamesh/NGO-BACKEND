const Volunteer = require("../models/Volunteer");

exports.createVolunteer = async (req, res) => {
  try {
    console.log("🔥 Volunteer API HIT");
    console.log("📦 Incoming Data:", req.body);

    const { name, email, phone, city, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
      console.log("❌ Required fields missing");
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // Save to database
    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      city,
      message
    });

    await newVolunteer.save();

    console.log("✅ Data Saved Successfully:", newVolunteer);

    res.status(201).json({
      success: true,
      message: "Volunteer form submitted successfully",
      data: newVolunteer
    });

  } catch (error) {
    console.log("❌ Server Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};