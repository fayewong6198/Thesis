const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

NoteSchema.virtual("votes", {
    ref: "Vote",
    localField: "_id",
    foreignField: "note",
    justOne: false
});

NoteSchema.virtual("images", {
    ref: "NoteImage",
    localField: "_id",
    foreignField: "note",
    justOne: false
});

module.exports = mongoose.model("Note", NoteSchema);
