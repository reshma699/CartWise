const express = require("express");
const router = express.Router();
const Price = require("../models/Price");

// Add a new price
router.post("/", async (req, res) => {
    try {
        const price = new Price(req.body);
        await price.save();
        res.status(201).json(price);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all prices
router.get("/", async (req, res) => {
    try {
        const prices = await Price.find().populate("product");
        res.json(prices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a price
router.put("/:id", async (req, res) => {
    try {
        const price = await Price.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!price) {
            return res.status(404).json({ message: "Price not found" });
        }

        res.json(price);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a price
router.delete("/:id", async (req, res) => {
    try {
        const price = await Price.findByIdAndDelete(req.params.id);

        if (!price) {
            return res.status(404).json({ message: "Price not found" });
        }

        res.json({ message: "Price deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;