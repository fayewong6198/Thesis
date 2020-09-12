const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Note = require("../models/Note");
const User = require("../models/User");
const Vote = require("../models/Vote");
const NoteImage = require("../models/NoteImage");
const path = require("path");

// @desc  Create Note
// @route POST notes/:key
// @access  Public
exports.createNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findOne({
    user: req.user,
    key: req.params.key,
  }).populate("images");

  if (note) {
    note = await Note.findOneAndUpdate(
      {
        user: req.user,
        key: req.params.key,
      },
      {
        text: req.body.text,
      },
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

exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find().populate("images");

  return res.status(200).json({ success: true, data: notes });
});

// @desc  Get Note
// @route Get notes/:key
// @access  Public
exports.getNote = asyncHandler(async (req, res, next) => {
  let note = await Note.find({ key: req.params.key })
    .populate("votes")
    .populate("images");

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
  }).populate("votes images");

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
    {
      key: req.params.key,
      user: req.user,
    },
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
    vote = await Vote.create({ note, user: req.user, action: req.body.action });
  }

  res.status(200).json({ success: true, data: vote });
});

// @des Upload photo for Note
// @route PUT /api/notes/:key/image
// @access  Private
exports.noteImageUpload = asyncHandler(async (req, res, next) => {
  const note = await Note.findOne({ key: req.params.key });

  if (!note) {
    return next(new ErrorResponse(`Error`, 404));
  }

  console.log(req.files);
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  let files = [];

  Array.isArray(req.files.image) === false
    ? files.push(req.files.image)
    : (files = [...req.files.image]);

  for (let i = 0; i < files.length; i++) {
    // Make sure the image is a photo
    if (!files[i].mimetype.startsWith("image")) {
      console.log("MineType " + !files[i].mimetype);
      return next(new ErrorResponse(`Please upload a image file`, 400));
    }

    // Check filesize
    if (files[i].size > process.env.MAX_FILE_UPLOAD)
      return next(
        new ErrorResponse(
          `Please upload a image file less than ${process.env.MAX_FILE_UPLOAD}`,
          404
        )
      );

    console.log(3);
    // Create custom filename
    const image = await NoteImage.create({
      //    user: req.user.id,
      note: note._id,
    });

    files[i].name = `photo_${image._id}${path.parse(files[i].name).ext}`;
    image.url = files[i].name;
    await image.save();

    files[i].mv(
      `${process.env.FILE_UPLOAD_PATH}/${files[i].name}`,
      async (err) => {
        if (err) {
          console.error(err);
          // Delete Image
          image.remove();
          return next(new ErrorResponse(`Problem with file upload`, 404));
        }
      }
    );
  }
  const updatednote = await Note.findById(note._id).populate("images");

  return res.status(200).json({ success: true, data: updatednote });
});

exports.deleteNoteImage = asyncHandler(async (req, res, next) => {
  let image = await NoteImage.findByIdAndDelete(req.params.imageId);

  const note = await Note.findOne({ key: req.params.key });

  return res.status(200).json({ success: true, data: note });
});
