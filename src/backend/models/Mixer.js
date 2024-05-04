const mongoose = require('mongoose');

const mixerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },  // e.g., Juice, Soda
    flavor_profile: { type: String, required: true }  // e.g., Citrus, Sweet, Tart
});

module.exports = mongoose.model('Mixer', mixerSchema);
