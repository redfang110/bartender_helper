const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },               // Tool name
    description: { type: String, required: true },        // Description, e.g., Used for mixing drinks
    imageUrl: { type: String, required: true }            // URL of the image (making it required)
});

module.exports = mongoose.model('Tool', toolSchema);