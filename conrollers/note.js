const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Note = require("../models/Note");
const User = require("../models/User");
const Vote = require("../models/Vote");

// @desc  Create Note
// @route POST notes/:key
// @access  Public
exports.createNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findOne({ user: req.user, key: req.params.key });

  if (note) {
    note = await Note.findOneAndUpdate(
      { user: req.user, key: req.params.key },
      { text: req.body.text },
      { new: true }
    );

    console.log(req.body);
    return res.status(200).json({ success: true, data: note });
  }

  console.log(req.body);
  note = Note.create({
    user: req.user,
    key: req.params.key,
    text: req.body.text,
  });

  res.status(200).json({ success: true, data: note });
});

// @desc  Get Note
// @route Get notes/:key
// @access  Public
exports.getNote = asyncHandler(async (req, res, next) => {
  let note = await Note.find({ key: req.params.key })
    .populate("votes")
    .populate("votes");

  if (!note) {
    return next(new ErrorResponse(`Note with ${key} not found`));
  }

  res.status(200).json({ success: true, data: note });
});

// @desc  Get Singele User Note
// @route Get notes/:key/user
// @access  Public
exports.getUserNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findOne({
    key: req.params.key,
    user: req.user,
  }).populate("votes");

  if (!note) {
    return next(new ErrorResponse(`Note with ${key} not found`));
  }

  res.status(200).json({ success: true, data: note });
});

// @desc  Update Singele User Note
// @route Update notes/:key/user
// @access  Public
exports.UpdateUserNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findOne({ key: req.params.key, user: req.user });

  if (!note) {
    return next(new ErrorResponse(`Note with ${key} not found`));
  }

  console.log(req.body);

  note = await Note.findOneAndUpdate(
    { key: req.params.key, user: req.user },
    req.body
  );

  res.status(200).json({ success: true, data: note });
});

// @desc  Delete Singele User Note
// @route delete notes/:key/user
// @access  Public
exports.DeleteUserNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findOne({ key: req.params.key, user: req.user });

  if (!note) {
    return next(new ErrorResponse(`Note with ${key} not found`));
  }

  note = await Note.findByIdAndDelete({ key: req.params.key, user: req.user });

  res.status(200).json({ success: true, data: note });
});

// @desc  Vote Singele User Note
// @route delete notes/:key/:user/upVote
// @access  Private
exports.voteUserNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findOne({ key: req.params.key, user: req.params.user });

  if (!note) {
    return next(new ErrorResponse(`Note with ${key} not found`));
  }

  let vote = await Vote.findOne({ note, user: req.user });

  console.log(req.body);

  if (vote) {
    vote.action = req.body.action;

    await vote.save();
  } else {
    vote = await Vote.create({
      note,
      user: req.user,
      action: req.body.action,
    });
  }

  res.status(200).json({ success: true, data: vote });
});
