require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ====== CONNECT MONGODB ======
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ====== ROUTES ======
try {
  const orderRoutes = require("./src/routes/orderRoutes");
  app.use("/api/orders", orderRoutes);
} catch (err) {
  console.log("No orderRoutes found, skipping...");
}

// ====== HEALTH CHECK ======
app.get("/", (req, res) => {
  res.json({ message: "Order Service running" });
});

// ====== START SERVER ======
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});