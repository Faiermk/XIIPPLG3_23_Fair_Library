const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');  // Pastikan ini adalah fungsi connectDB untuk MongoDB
const categoriesRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');  

dotenv.config();
const app = express();
app.use(express.json());

connectDB();  // Panggil fungsi connectDB untuk MongoDB

app.use('/api/auth', authRoutes);
app.use(categoriesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
