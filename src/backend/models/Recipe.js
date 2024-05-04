const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    createdBy: String,
    ingredients: {
        spirits: [String],
        mixers: [String],
        tools: [String]
    },
    steps: [String],
    serving: String
});

module.exports = mongoose.model('Recipe', recipeSchema);
