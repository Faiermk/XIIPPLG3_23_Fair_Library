const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Menginisialisasi dotenv untuk membaca file .env
dotenv.config();

// Membuat koneksi pool ke database MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Menguji koneksi ke database
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connected to MySQL database');
        connection.release(); // Melepaskan koneksi setelah berhasil terhubung
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1); // Keluar jika koneksi gagal
    }
})();

module.exports = db;
