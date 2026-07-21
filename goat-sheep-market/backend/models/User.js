const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'seller'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
