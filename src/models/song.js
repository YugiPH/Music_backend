const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  imageUrl: { type: String, required: true },
  streamUrl: { type: String, required: true },
  favoriteId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
  imagePublicId: { type: String },
  streamPublicId: { type: String },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
});

module.exports = mongoose.model('Song', songSchema);
