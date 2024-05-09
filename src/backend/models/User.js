const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },  
    spirits: [String],  
    mixers: [String],
    tools: [String],
    recipes: [String],
    userRecipes: [String]
});

module.exports = mongoose.model('User', userSchema);
