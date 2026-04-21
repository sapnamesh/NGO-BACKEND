const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// 1. CONNECT DB
connectDB();

// 2. BODY PARSER (Move this BEFORE routes)
app.use(express.json());

// 3. FIXED CORS (Handled correctly for Render)
app.use((req, res, next) => {
  // Use '*' for testing, or process.env.FRONTEND_URL for security
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // CRITICAL: Immediately respond to preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// 4. LOG REQUESTS (Helpful for debugging Render)
app.use((req, res, next) => {
  console.log(`${req.method} request to: ${req.url}`);
  next();
});

// 5. ROUTES
app.use("/api/volunteer", require("./routes/volunteerRoutes"));
app.use("/api/partner", require("./routes/partnerRoutes"));
app.use("/api/donate", require("./routes/donationRoutes"));

// 6. HEALTH CHECK
app.get("/", (req, res) => {
  res.send("API Running... 🚀");
});

// 7. START SERVER (Bind to 0.0.0.0 for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
