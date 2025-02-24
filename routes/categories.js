const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mendapatkan Semua Kategori
router.get('/', async (req, res) => {
    try {
        console.log('📥 Mendapatkan semua kategori...');
        const [results] = await db.query('SELECT * FROM categories');
        
        if (results.length > 0) {
            console.log('✅ Kategori ditemukan:', results);
            res.json(results);
        } else {
            console.log('⚠️ Tidak ada kategori yang ditemukan.');
            res.status(404).json({ message: 'Tidak ada kategori yang ditemukan.' });
        }
    } catch (err) {
        console.error('❌ Gagal mendapatkan kategori:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Menambahkan Kategori Baru
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: 'Nama dan deskripsi wajib diisi.' });
        }
        
        const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
        const [result] = await db.query(query, [name, description]);
        
        console.log('✅ Kategori baru berhasil ditambahkan:', result);
        res.status(201).json({ message: 'Kategori berhasil ditambahkan.' });
    } catch (err) {
        console.error('❌ Gagal menambahkan kategori:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
