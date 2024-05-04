const mongoose = require('mongoose');

const spiritSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },  // e.g., Vodka, Rum, Whiskey
    flavor_profile: { type: String, required: true }  // e.g., Sweet, Bitter, Sour
});

module.exports = mongoose.model('Spirit', spiritSchema);
