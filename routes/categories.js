const express = require('express');
const router = express.Router();
const Kategori = require('../models/categories');  // Mengimpor model Kategori

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Kategori.find();  // Mengambil semua kategori
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new category
router.post('/categorie', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const newCategory = new Kategori({ name }); // Buat instance kategori baru
        await newCategory.save(); // Simpan ke database

        res.status(201).json({ message: "Category berhasil ditambahkan.", category: newCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update a category
router.put('/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const updatedCategory = await Kategori.findByIdAndUpdate(id, { name }, { new: true });  // Memperbarui kategori
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category Updated', updatedCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Kategori.findByIdAndDelete(id);  // Menghapus kategori berdasarkan ID
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category Deleted', id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
