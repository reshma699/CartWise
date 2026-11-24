const express = require("express");
const router = express.Router();
const ShoppingList = require("../models/ShoppingList");

// Create shopping list
router.post("/", async (req, res) => {
    try {
        const list = await ShoppingList.create(req.body);
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all shopping lists
router.get("/", async (req, res) => {
    try {
        const lists = await ShoppingList.find()
            .populate("user")
            .populate("items.product");
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update shopping list
router.put("/:id", async (req, res) => {
    try {
        const list = await ShoppingList.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!list) return res.status(404).json({ message: "List not found" });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete shopping list
router.delete("/:id", async (req, res) => {
    try {
        const list = await ShoppingList.findByIdAndDelete(req.params.id);
        if (!list) return res.status(404).json({ message: "List not found" });
        res.json({ message: "Shopping list deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;