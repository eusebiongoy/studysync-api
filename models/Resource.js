const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
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

  title: {
    type: String,
    required: true
  },

  resourceType: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
});

module.exports = mongoose.model("Resource", resourceSchema);