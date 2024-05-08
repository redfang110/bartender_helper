const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');

// Get all tools
router.get('/', async (req, res) => {
    try {
        const tools = await Tool.find();  // Fetches all tools from the database
        res.json(tools);  // Sends the tools as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });  // Error handling
    }
});

// Add a new tool
router.post('/', async (req, res) => {
    const tool = new Tool({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl  // Ensure this matches the field name in the Mongoose schema
    });

    try {
        const newTool = await tool.save();  // Saves the new tool to the database
        res.status(201).json(newTool);  // Returns the newly created tool with a 201 status code
    } catch (error) {
        res.status(400).json({ message: error.message });  // Handles errors, sending a 400 status if something goes wrong
    }
});

module.exports = router;  // Exports the router for use elsewhere in the application
