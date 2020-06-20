const mongoose = require("mongoose");

const Note = require("../models/Note");
const VoteSchema = new mongoose.Schema(
  {
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "note",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    action: {
      type: String,
      enum: ["upVote", "downVote", "none"],
      default: "none",
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

module.exports = mongoose.model("Vote", VoteSchema);
