const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    createdBy: String,
    ingredients: {
        spirits: [String], 
        mixers: [String],
        tools: [String]
    }, // Simplified if you just have a list of ingredients
    steps: [String],
    serving: String,
    imageUrl: { type: String, required: true } // Ensure the field name matches your front-end and API
});

module.exports = mongoose.model('Recipe', recipeSchema);
