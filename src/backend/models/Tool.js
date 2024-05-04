const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }  // e.g., Used for mixing drinks
});

module.exports = mongoose.model('Tool', toolSchema);
