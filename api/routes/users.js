const express = require("express");
const User = require("../models/User.js");

const router = express.Router();

//! All Categories
router.get('/all-users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

//! Created a new User
router.get('/', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;