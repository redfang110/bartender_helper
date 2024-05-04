const express = require('express');
const router = express.Router();
const Mixer = require('../models/Mixer');

// Get all mixers
router.get('/', async (req, res) => {
    try {
        const mixers = await Mixer.find();
        res.json(mixers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new mixer
router.post('/', async (req, res) => {
    const mixer = new Mixer({
        name: req.body.name,
        type: req.body.type,
        flavor_profile: req.body.flavor_profile
    });
    try {
        const newMixer = await mixer.save();
        res.status(201).json(newMixer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
