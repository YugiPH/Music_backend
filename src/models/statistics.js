const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  totalSongs: { type: Number, default: 0 },
  totalPlaylists: { type: Number, default: 0 },
  dailyPlays: { type: Number, default: 0 }
});

module.exports = mongoose.model('Statistics', statisticsSchema);
