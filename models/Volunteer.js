const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    message: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("volunteer", volunteerSchema);