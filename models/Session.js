const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  notes: {
    type: String
  }
});

module.exports = mongoose.model("Session", sessionSchema);