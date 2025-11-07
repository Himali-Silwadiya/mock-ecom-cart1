
const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

// ✅ Get cart items
router.get("/", async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});

// ✅ Add to cart
router.post("/", async (req, res) => {
  const { productId, name, price } = req.body;
  let item = await CartItem.findOne({ productId });

  if (item) {
    item.quantity += 1;
    await item.save();
  } else {
    item = new CartItem({ productId, name, price, quantity: 1 });
    await item.save();
  }

  res.json(item);
});

// ✅ Remove from cart
router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

// ✅ Clear all (optional)
router.delete("/", async (req, res) => {
  await CartItem.deleteMany();
  res.json({ message: "Cart cleared" });
});

module.exports = router;
