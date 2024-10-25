const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter a userName'],
    unique: true, 
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, 'Please enter a mobile number'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  role: {
    type: String,
    required: [true, 'Please enter a role'],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
