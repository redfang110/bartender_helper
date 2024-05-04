const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');

// Get all tools
router.get('/', async (req, res) => {
    try {
        const tools = await Tool.find();
        res.json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new tool
router.post('/', async (req, res) => {
    const tool = new Tool({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newTool = await tool.save();
        res.status(201).json(newTool);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
