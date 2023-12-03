const express = require("express");
const Category = require("../models/Category.js");

const router = express.Router();

//! All Categories
router.get('/all-categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json(error);
    }
})

//! Created a new Category
router.post('/add-category', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/update-category', async (req, res) => {
    try {
        await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
        res.status(200).json("Item updated successfully");
    } catch (error) {
        res.status(404).json(error);
    }
})

router.delete('/delete-category', async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.body.categoryId });
        res.status(200).json("Item deleted successfully");
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router;