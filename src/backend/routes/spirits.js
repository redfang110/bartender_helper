const express = require('express');
const router = express.Router();
const Spirit = require('../models/Spirit');

// Get all spirits
router.get('/', async (req, res) => {
    try {
        const spirits = await Spirit.find();
        res.json(spirits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new spirit
router.post('/', async (req, res) => {
    const spirit = new Spirit({
        name: req.body.name,
        type: req.body.type,
        flavor_profile: req.body.flavor_profile
    });
    try {
        const newSpirit = await spirit.save();
        res.status(201).json(newSpirit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
