const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  courseName: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  },

  semester: {
    type: String,
    required: true
  },

  credits: {
    type: Number,
    required: true
  },

  description: {
    type: String
  }
});

module.exports = mongoose.model("Course", courseSchema);