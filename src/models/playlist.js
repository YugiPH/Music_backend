const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

// Phương thức thêm bài hát vào playlist
playlistSchema.methods.addSong = function (songId) {
  this.songs.push(songId);
  return this.save();
};

module.exports = mongoose.model('Playlist', playlistSchema);
