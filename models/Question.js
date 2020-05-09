const mongoose = require("mongoose");
const Chapter = require("./Chapter");
const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  answer: {
    type: [String],
    required: true,
  },
  rightAnswer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  knowledge: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chapter",
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
});

module.exports = mongoose.model("Question", QuestionSchema);
