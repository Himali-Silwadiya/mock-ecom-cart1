
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Define schema
const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ✅ POST /api/checkout
router.post("/", async (req, res) => {
  try {
    console.log("🧾 Checkout request received:", req.body);

    const { name, email, items, total } = req.body;

    // ✅ Proper validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof total !== "number"
    ) {
      console.log("❌ Invalid or missing fields in request");
      return res.status(400).json({ message: "Invalid or missing fields" });
    }

    // ✅ Save order in MongoDB
    const newOrder = new Order({ name, email, items, total });
    await newOrder.save();

    console.log("✅ Order saved successfully:", newOrder);

    // ✅ Send response to frontend
    res.json({
      success: true,
      message: "Order placed successfully!",
      total: total,
      timestamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.error("❌ Checkout Error:", error);
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
});

module.exports = router;
