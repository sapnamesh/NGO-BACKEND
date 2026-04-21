const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const volunteerRoutes = require("./routes/volunteerRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();

// ✅ CORS FIX (IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173", // local
  process.env.FRONTEND_URL // production (from .env)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps / postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect Database
connectDB();

// ✅ Routes
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/donate", donationRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Optional test route
app.get("/check", async (req, res) => {
  const data = await require("./models/Volunteer").find();
  res.json(data);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});