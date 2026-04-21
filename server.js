const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// ===============================
// DB CONNECTION FIRST (safe)
// ===============================
connectDB();

// ===============================
// BODY PARSER
// ===============================
app.use(express.json());

// ===============================
// CORS (ULTRA FIXED VERSION)
// ===============================
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://astreefoundation.org",
        "https://www.astreefoundation.org"
      ];

      // allow mobile apps / postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED ORIGIN:", origin);
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ===============================
// IMPORTANT: FORCE PREFLIGHT SUPPORT
// ===============================
app.options("*", cors());

// ===============================
// ROUTES
// ===============================
app.use("/api/volunteer", require("./routes/volunteerRoutes"));
app.use("/api/partner", require("./routes/partnerRoutes"));
app.use("/api/donate", require("./routes/donationRoutes"));

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});