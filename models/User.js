const db = require('../config/database');

// ✅ Fungsi untuk mengambil user berdasarkan ID (untuk route profile)
async function getUserById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

// ✅ Fungsi untuk mengambil user berdasarkan username
async function getUserByUsername(username) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

// ✅ Fungsi untuk menambahkan user baru
async function createUser({ username, password, name, email, phone }) {
    const [results] = await db.query(
        'INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)',
        [username, password, name, email, phone]
    );
    return { id: results.insertId, username, name, email, phone };
}

module.exports = { getUserByUsername, createUser, getUserById };
