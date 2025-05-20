const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://at8482937:nspBF1dxyJgPMXKs@cluster0.5mnpa3p.mongodb.net/crm_dashboard?retryWrites=true&w=majority"
)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Mongoose Schema & Model
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  source: {
    type: String,
    default: "Unknown",
  },
  score: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["New", "Qualified", "Opportunity", "Won", "Lost"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

// Routes
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ created_at: -1 });
    res.json(leads);
  } catch (err) {
    console.error("GET /api/leads error:", err.message);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

app.post("/api/leads", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    console.error("POST /api/leads error:", err.message);
    res.status(400).json({ error: err.message }); // Send full validation error
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
