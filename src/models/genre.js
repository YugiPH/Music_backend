const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Genre', genreSchema);
