const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
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

    phone: { // ✅ NEW (for contact / WhatsApp)
      type: String,
      trim: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentId: { // optional (future use)
      type: String,
      default: null
    },

    status: { // ✅ NEW (VERY IMPORTANT)
      type: String,
      enum: ["pending", "verified"],
      default: "pending"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);