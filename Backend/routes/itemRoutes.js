const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// route   GET /api/items
// desc    Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// route   POST /api/items
// desc    Add new item
router.post("/", async (req, res) => {
  try {
    const { name, category, expiryDate, quantity } = req.body;

    if (!name || !category || !expiryDate || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Item({ name, category, expiryDate, quantity });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// route   PUT /api/items/:id
// desc    Update an item
router.put("/:id", async (req, res) => {
  try {
    const { name, category, expiryDate, quantity } = req.body;

    if (!name || !category || !expiryDate || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, category, expiryDate, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// route   DELETE /api/items/:id
// desc    Delete an item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
