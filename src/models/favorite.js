const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
