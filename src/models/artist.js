const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Artist', artistSchema);
