const db = require('../config/database');

// ✅ Mendapatkan semua buku
async function getAllBooks() {
    const [results] = await db.query('SELECT * FROM books');
    return results;
}

// ✅ Mendapatkan buku berdasarkan ID
async function getBookById(id) {
    const [results] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return results[0];
}

// ✅ Menambahkan buku baru
async function createBook(bookData) {
    const { title, writer, user_id, category_id, publisher, year } = bookData;
    const [results] = await db.query(
        'INSERT INTO books (title, writer, user_id, category_id, publisher, year) VALUES (?, ?, ?, ?, ?, ?)',
        [title, writer, user_id, category_id, publisher, year]
    );
    return { id: results.insertId, ...bookData };
}

// ✅ Memperbarui buku
async function updateBook(id, bookData) {
    const { title, writer, user_id, category_id, publisher, year } = bookData;
    const [results] = await db.query(
        'UPDATE books SET title = ?, writer = ?, user_id = ?, category_id = ?, publisher = ?, year = ? WHERE id = ?',
        [title, writer, user_id, category_id, publisher, year, id]
    );
    return results.affectedRows > 0;
}

// ✅ Menghapus buku
async function deleteBook(id) {
    const [results] = await db.query('DELETE FROM books WHERE id = ?', [id]);
    return results.affectedRows > 0;
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};