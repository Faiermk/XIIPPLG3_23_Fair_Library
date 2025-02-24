// server.js

require('dotenv').config(); // Memuat variabel lingkungan dari .env

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const categoriesRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routing
app.use('/api/kategori', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/books', bookRoutes);




// Menjalankan server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
