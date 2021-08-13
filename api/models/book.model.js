
const mongoose = require('mongoose');
const { StringUtil } = require('../utilities/string-util');

const bookSchema = new mongoose.Schema({
    title: String,
    body: String,
    dueDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

// Adds create_at and updated_at timestamps
bookSchema.set('timestamps', true);

module.exports = mongoose.model('book', bookSchema);