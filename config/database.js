const mongoose = require('mongoose');
require('dotenv').config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI tidak ditemukan dalam .env");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected...");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;