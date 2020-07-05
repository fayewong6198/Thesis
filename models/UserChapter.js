const mongoose = require("mongoose");

const UserChapterSchema = new mongoose.Schema(
  {
    userCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCourse",
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    elo: {
      type: Number,
      default: null,
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
module.exports = mongoose.model("UserChapter", UserChapterSchema);
