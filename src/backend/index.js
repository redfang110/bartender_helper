const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Ensure you have installed dotenv: npm install dotenv

const app = express();
const PORT = process.env.PORT || 4000;  // Set port via environment variable or use 4000

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bartender_helper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB:', err);
});

// Middleware
app.use(cors());  // Enables CORS for all requests
app.use(express.json());  // Parses JSON requests

// Import routes
//const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const spiritRoutes = require('./routes/spirits');
const mixerRoutes = require('./routes/mixers');
const toolRoutes = require('./routes/tools');
const userRoutes = require('./routes/users');

// Use routes
//app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/spirits', spiritRoutes);
app.use('/api/mixers', mixerRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/users', userRoutes);

// Error handling for unavailable routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
