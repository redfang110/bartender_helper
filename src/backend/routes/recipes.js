const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');


// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new recipe
router.post('/', async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        createdBy: req.body.createdBy,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        serving: req.body.serving,
        imageUrl: req.body.imageUrl // Include the imageUrl field
    });
    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/find', async (req, res) => {
    try {
        const { spirits, mixers, tools } = req.body;
        const recipes = await Recipe.find({
            'ingredients.spirits': { $all: spirits },
            'ingredients.mixers': { $all: mixers },
            'ingredients.tools': { $all: tools }
        });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
