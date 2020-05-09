const mongoose = require("mongoose");

const QuestionBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
QuestionBankSchema.virtual("chapters", {
  ref: "Chapter",
  localField: "_id",
  foreignField: "questionBank",
  justOne: false,
});

QuestionBankSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "questionBank",
  justOne: false,
});

module.exports = mongoose.model("QuestionBank", QuestionBankSchema);
