const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

// 1. DEFINE CORS OPTIONS ONCE
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://astreefoundation.org",
      "https://www.astreefoundation.org"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("❌ BLOCKED ORIGIN:", origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// 2. APPLY CORS BEFORE BODY PARSER
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Use the SAME options here

// 3. BODY PARSER
app.use(express.json());

// 4. ROUTES
app.use("/api/volunteer", require("./routes/volunteerRoutes"));
app.use("/api/partner", require("./routes/partnerRoutes"));
app.use("/api/donate", require("./routes/donationRoutes"));

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
