const express = require("express");
const Bill = require("../models/Bill.js");

const router = express.Router();

//! All Categories
router.get('/all-bills', async (req, res) => {
    try {
        const Bills = await Bill.find();
        res.status(200).json(Bills);
    } catch (error) {
        res.status(500).json(error);
    }
})

//! Created a new Bill
router.post('/add-bill', async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;