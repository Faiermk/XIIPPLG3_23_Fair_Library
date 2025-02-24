const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// ✅ Mendapatkan semua buku
router.get('/', async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Mendapatkan buku berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.getBookById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Menambahkan buku baru
router.post('/', async (req, res) => {
    const { title, writer, user_id, category_id, publisher, year } = req.body;
    if (!title || !writer || !user_id || !category_id || !publisher || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newBook = await Book.createBook({ 
            title, 
            author: writer, // ⬅ Mapping writer ke author di model
            user_id, 
            category_id, 
            publisher, 
            year 
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error creating book:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Memperbarui buku
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, writer, user_id, category_id, publisher, year } = req.body;
    if (!title || !writer || !user_id || !category_id || !publisher || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const updated = await Book.updateBook(id, { 
            title, 
            author: writer, // ⬅ Mapping writer ke author di model
            user_id, 
            category_id, 
            publisher, 
            year 
        });
        if (!updated) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error("Error updating book:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Menghapus buku
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Book.deleteBook(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error("Error deleting book:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;