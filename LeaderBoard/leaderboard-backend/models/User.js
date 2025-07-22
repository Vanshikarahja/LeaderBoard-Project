
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  totalPoints: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);
