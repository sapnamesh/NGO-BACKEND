const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentId: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ["pending","verified"],
    default: "pending"
  }

},
{ timestamps:true }
);

module.exports = mongoose.model("Donation", donationSchema);