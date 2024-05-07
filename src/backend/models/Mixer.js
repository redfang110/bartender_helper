const mongoose = require('mongoose');

const mixerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },  // e.g., Juice, Soda
    flavorProfile: { type: String, required: true },  // e.g., Citrus, Sweet, Tart
    imageUrl: { type: String, required: true } // URL of the image
});

module.exports = mongoose.model('Mixer', mixerSchema);
