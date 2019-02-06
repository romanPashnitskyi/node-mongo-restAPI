const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    author: String,
    year: Number,
    description: String
});

module.exports = mongoose.model('Books', bookSchema);
