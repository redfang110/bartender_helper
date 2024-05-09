const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Hash the password
        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        const user = new User({
            name: username,
            password: hashedPassword,  
            spirits: [],  
            mixers: [],
            tools: [],
            recipes: [],
            userRecipes: []
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const hashedPasswordFromDB = user.password;

        // Compare hashed password from DB with provided password
        const match = await bcrypt.compare(password, hashedPasswordFromDB);

        if (match) {
            res.status(200).json(user);
        } else {
            return res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPasswordFromDB = user.password;

        // Compare hashed password from DB with provided password
        const match = await bcrypt.compare(req.body.oldPassword, hashedPasswordFromDB);

        if (match) {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10); // 10 is the saltRounds
            user.password = hashedPassword;
            await user.save();
            res.status(200).json(user);
        } else {
            return res.status(401).send('Passwords do not match');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Add spirit to user
router.post('/add-spirit', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.spirits.push(req.body.spirit);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove spirit to user
router.post('/remove-spirit', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.spirits = user.spirits.filter(spirit => spirit !== req.body.spirit);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add mixer to user
router.post('/add-mixer', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.mixers.push(req.body.mixer);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove mixer to user
router.post('/remove-mixer', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.mixers = user.mixers.filter(mixer => mixer !== req.body.mixer);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add tool to user
router.post('/add-tool', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.tools.push(req.body.tool);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove tool to user
router.post('/remove-tool', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.tools = user.tools.filter(tool => tool !== req.body.tool);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add recipe to user
router.post('/add-recipe', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.recipes.push(req.body.recipe);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove recipe to user
router.post('/remove-recipe', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.recipes = user.recipes.filter(recipe => recipe !== req.body.recipe);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add recipe to user
router.post('/add-user-recipe', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.userRecipes.push(req.body.recipe);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove recipe to user
router.post('/remove-user-recipe', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.recipes = user.userRecipes.filter(recipe => recipe !== req.body.recipe);
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
