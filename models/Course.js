const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    questionBank: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "questionBank",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Course", CourseSchema);
