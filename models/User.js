const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  profileImage: {
    type: String
  },

  oauthProvider: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);