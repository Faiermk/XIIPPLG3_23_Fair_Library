const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const categoriesRoutes = require('./routes/categories')
const authRoutes = require('./routes/auth');  // Tambahkan ini

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

// Gunakan route auth
app.use('/api/auth', authRoutes);
app.use('/api/kategori', categoriesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));