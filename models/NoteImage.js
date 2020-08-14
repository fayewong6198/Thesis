const mongoose = require("mongoose");

const NoteImageSchema = new mongoose.Schema({
    url: {
        type: String,
        default: "no-avatar.jpg"
    },
    note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
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

module.exports = mongoose.model("NoteImage", NoteImageSchema);
