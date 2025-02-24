const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ✅ Get all users (menggunakan async/await)
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM users');
        res.status(200).json(results);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add a new user
router.post('/', async (req, res) => {
    const { username, password, name, email, phone } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and Password are required' });
    }
    try {
        const [results] = await db.query(
            'INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)', 
            [username, password, name, email, phone]
        );
        res.status(201).json({ id: results.insertId, username, name, email, phone });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update a user
router.put('/:id', async (req, res) => {
    const { username, password, name, email, phone } = req.body;
    const { id } = req.params;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and Password are required' });
    }
    try {
        const [results] = await db.query(
            'UPDATE users SET username = ?, password = ?, name = ?, email = ?, phone = ? WHERE id = ?', 
            [username, password, name, email, phone, id]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User Updated', id, username, name, email, phone });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User Deleted', id });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
