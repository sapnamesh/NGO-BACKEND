const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const volunteerRoutes = require("./routes/volunteerRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

// ===============================
// ✅ CORS FIX (PRODUCTION READY)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://astreefoundation.org",
  "https://www.astreefoundation.org"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / postman requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS blocked request from:", origin);
        return callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ===============================
// Middleware
// ===============================
app.use(express.json());

// ===============================
// Database Connection
// ===============================
connectDB();

// ===============================
// Routes
// ===============================
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/donate", donationRoutes);

// ===============================
// Health Check
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 API Running Successfully");
});

// ===============================
// Optional Debug Route
// ===============================
app.get("/check", async (req, res) => {
  try {
    const data = await require("./models/Volunteer").find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});