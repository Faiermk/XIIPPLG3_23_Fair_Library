const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Koneksi ke MySQL
const authMiddleware = require('../middlewares/auth');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// REGISTRASI PENGGUNA
router.post('/register', async (req, res) => {
    try {
        const { username, password, name, email, phone } = req.body;

        if (!username || !password || !name || !email || !phone) {
            return res.status(400).json({ message: 'Semua field wajib diisi.' });
        }

        // Cek apakah pengguna sudah ada di database
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Pengguna sudah terdaftar.' });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna baru ke database
        await db.query(
            'INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, name, email, phone]
        );

        res.status(201).json({ message: 'Registrasi berhasil.' });
    } catch (error) {
        console.error('❌ Kesalahan Server:', error.message);
        res.status(500).json({ message: 'Kesalahan server.', error: error.message });
    }
});

// LOGIN PENGGUNA
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password wajib diisi.' });
        }

        // Cek pengguna di database
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password salah.' });
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login berhasil.', token });
    } catch (error) {
        console.error('❌ Kesalahan Server:', error.message);
        res.status(500).json({ message: 'Kesalahan server.', error: error.message });
    }
});

// MELIHAT PROFIL PENGGUNA (PROTECTED ROUTE)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, name, email, phone FROM users WHERE id = ?', [req.user.userId]);
        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        res.json({ message: 'Profil pengguna berhasil diambil.', user });
    } catch (error) {
        console.error('❌ Kesalahan Server:', error.message);
        res.status(500).json({ message: 'Kesalahan server.', error: error.message });
    }
});

// VERIFIKASI TOKEN (PROTECTED ROUTE)
router.post('/verify-token', authMiddleware, (req, res) => {
    res.json({ message: 'Token valid.', user: req.user });
});

module.exports = router;
