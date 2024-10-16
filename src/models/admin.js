const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' }
});

adminSchema.methods.manageUsers = function () {
  // Logic quản lý người dùng
};

module.exports = mongoose.model('Admin', adminSchema);
