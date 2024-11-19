const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  imageUrl: { type: String, required: true },
  streamUrl: { type: String, required: true },
  favoriteId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }]
});

// Phương thức phát bài hát
songSchema.methods.play = function () {
  this.playCount += 1;
  return this.save();
};

module.exports = mongoose.model('Song', songSchema);
