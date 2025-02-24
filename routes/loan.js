const express = require('express');
const router = express.Router();
const Loan = require('../models/loan');

// ✅ Mendapatkan semua data peminjaman
router.get('/', async (req, res) => {
    try {
        const loans = await Loan.getAllLoans();
        res.status(200).json(loans);
    } catch (error) {
        console.error("Error fetching loans:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Mendapatkan data peminjaman berdasarkan ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const loan = await Loan.getLoanById(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        console.error("Error fetching loan by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Menambahkan data peminjaman baru
router.post('/', async (req, res) => {
    const { book_id, user_id, loan_date, return_date, status } = req.body;
    if (!book_id || !user_id || !loan_date || !return_date || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newLoan = await Loan.createLoan({ book_id, user_id, loan_date, return_date, status });
        res.status(201).json(newLoan);
    } catch (error) {
        console.error("Error creating loan:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Memperbarui data peminjaman
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { book_id, user_id, loan_date, return_date, status } = req.body;
    if (!book_id || !user_id || !loan_date || !return_date || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const updated = await Loan.updateLoan(id, { book_id, user_id, loan_date, return_date, status });
        if (!updated) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan updated successfully' });
    } catch (error) {
        console.error("Error updating loan:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Menghapus data peminjaman
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Loan.deleteLoan(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        console.error("Error deleting loan:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;