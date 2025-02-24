const db = require('../config/database');

// Ambil semua kategori
async function getAllCategories() {
    const [results] = await db.query('SELECT * FROM kategori');
    return results;
}

// Tambah kategori baru
async function addCategory(name) {
    const [results] = await db.query('INSERT INTO kategori (name) VALUES (?)', [name]);
    return { id: results.insertId, name };
}

// Update kategori berdasarkan ID
async function updateCategory(id, name) {
    const [results] = await db.query('UPDATE kategori SET name = ? WHERE id = ?', [name, id]);
    return results.affectedRows > 0;
}

// Hapus kategori berdasarkan ID
async function deleteCategory(id) {
    const [results] = await db.query('DELETE FROM kategori WHERE id = ?', [id]);
    return results.affectedRows > 0;
}

module.exports = { getAllCategories, addCategory, updateCategory, deleteCategory };
