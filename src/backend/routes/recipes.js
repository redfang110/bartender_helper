const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Route to get all recipes from the database
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetches all recipes
        res.json(recipes); // Sends recipes as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handles errors
    }
});

// Route to create a new recipe
router.post('/', async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        createdBy: req.body.createdBy,
        ingredients: {
            spirits: req.body.ingredients.spirits,
            mixers: req.body.ingredients.mixers,
            tools: req.body.ingredients.tools,
        },
        steps: req.body.steps,
        serving: req.body.serving,
        imageUrl: req.body.imageUrl // Image URL included as part of the recipe
    });

    try {
        const newRecipe = await recipe.save(); // Saves the new recipe to the database
        res.status(201).json(newRecipe); // Returns the newly created recipe with status 201
    } catch (error) {
        res.status(400).json({ message: error.message }); // Catches and reports errors
    }
});

// Route to find recipes based on provided ingredients' criteria
router.post('/find', async (req, res) => {
    try {
        const { spirits, mixers, tools } = req.body; // Destructures the request body to extract ingredients
        const recipes = await Recipe.find({
            'ingredients.spirits': { $all: spirits },
            'ingredients.mixers': { $all: mixers },
            'ingredients.tools': { $all: tools }
        });

        res.json(recipes); // Sends matching recipes as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handles errors
    }
});

module.exports = router; // Exports the router for use in other parts of the application
