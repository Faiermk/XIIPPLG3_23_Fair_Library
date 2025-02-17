const mongoose = require('mongoose');

// Define schema for category
const kategoriSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

const Kategori = mongoose.model('Kategori', kategoriSchema);

module.exports = Kategori;
