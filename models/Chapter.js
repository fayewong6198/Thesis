const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  name: String,
  questionBank: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "questionBank"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Chapter", ChapterSchema);
