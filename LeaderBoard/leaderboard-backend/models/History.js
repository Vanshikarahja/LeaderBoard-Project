const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);
