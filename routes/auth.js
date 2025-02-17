const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Pastikan model User sudah dibuat
const authMiddleware = require('../middlewares/auth');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, name, email, phone } = req.body;
        
        if (!username || !password || !name || !email || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Mencari ID terakhir
        const lastUser = await User.findOne().sort({ id: -1 });

        // Perbaikan: Pastikan `lastUser?.id` valid, jika tidak, mulai dari 1
        const newId = lastUser && !isNaN(lastUser.id) ? lastUser.id + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            id: newId, // ID yang diperbaiki
            username,
            password: hashedPassword,
            name,
            email,
            phone
        });

        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Protected Route Example
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Token Verification Route
router.post('/verify-token', authMiddleware, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;