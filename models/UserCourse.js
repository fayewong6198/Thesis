const mongoose = require("mongoose");

const UserCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    questionBank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionBank",
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
module.exports = mongoose.model("UserCourse", UserCourseSchema);
