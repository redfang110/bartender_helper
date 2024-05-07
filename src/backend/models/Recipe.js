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
    serving: String,
    image: { type: String, required: true } // URL of the image
});

module.exports = mongoose.model('Recipe', recipeSchema);
