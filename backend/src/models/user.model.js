const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Username already exists"]
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Account with this email already exists"]
  },
  password: {
    type: String,
    required: true
  }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;