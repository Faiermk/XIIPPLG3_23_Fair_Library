const db = require('../config/database');

// ✅ Mendapatkan semua data peminjaman
async function getAllLoans() {
    const [results] = await db.query('SELECT * FROM loans');
    return results;
}

// ✅ Mendapatkan data peminjaman berdasarkan ID
async function getLoanById(id) {
    const [results] = await db.query('SELECT * FROM loans WHERE id = ?', [id]);
    return results[0];
}

// ✅ Menambahkan data peminjaman baru
async function createLoan(loanData) {
    const { book_id, user_id, loan_date, return_date, status } = loanData;
    const [results] = await db.query(
        'INSERT INTO loans (book_id, user_id, loan_date, return_date, status) VALUES (?, ?, ?, ?, ?)',
        [book_id, user_id, loan_date, return_date, status]
    );
    return { id: results.insertId, ...loanData };
}

// ✅ Memperbarui data peminjaman
async function updateLoan(id, loanData) {
    const { book_id, user_id, loan_date, return_date, status } = loanData;
    const [results] = await db.query(
        'UPDATE loans SET book_id = ?, user_id = ?, loan_date = ?, return_date = ?, status = ? WHERE id = ?',
        [book_id, user_id, loan_date, return_date, status, id]
    );
    return results.affectedRows > 0;
}

// ✅ Menghapus data peminjaman
async function deleteLoan(id) {
    const [results] = await db.query('DELETE FROM loans WHERE id = ?', [id]);
    return results.affectedRows > 0;
}

module.exports = {
    getAllLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
};