const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 5,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpore: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
      default: "no-avatar.jpg",
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

UserSchema.virtual("questionBannks", {
  ref: "QuestionBank",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

UserSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

UserSchema.virtual("courses", {
  ref: "UserCourse",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, "secret", {});
};
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
