const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const QuestionBank = require("../models/QuestionBank");
const mongoose = require("mongoose");
const path = require("path");
// @desc  Update User
// @route put/user
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  const file = req.files.file;

  console.log(req.files);
  file.name = `avatar_${req.user._id}.jpg`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      // Delete Image
      return next(new ErrorResponse(`Problem with file upload`, 404));
    }

    const user = await User.findByIdAndUpdate(req.user.id, {
      avatar: file.name,
    });

    res.status(200).json({ success: true, data: user });
  });
});

// @desc  Add course User
// @route put /user/courses/questionBankId
// @access  Private

exports.updateUserCourse = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  courses = user.courses;
  // Check duplicate
  for (let course in courses) {
    if (course == req.params.questionBankId) {
      return next(new ErrorResponse("Course is already exits", 500));
    }
  }

  user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: {
        courses: req.params.questionBankId,
      },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc  Get user's course
// @route GET /user/courses
// @access  Private
exports.getUserCourse = asyncHandler(async (req, res, next) => {
  const questionBanks = await QuestionBank.find({
    _id: { $in: req.user.courses },
  })
    .populate("user")
    .populate("chapters");

  return res.status(200).json({ success: true, data: questionBanks });
});

// @desc  Add course
// @route POST /user/addCourse/:id
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  console.log(user);
  if (user.courses.includes(req.params.id)) {
    return next(new ErrorResponse("This course is already added"), 500);
  }

  console.log(req.params.id);
  user.courses.push(mongoose.Types.ObjectId(req.params.id));

  user = await User.findByIdAndUpdate(req.user.id, { courses: user.courses });

  return res.status(200).json({ success: true, data: user });
});

// @desc  Remove course
// @route POST /user/removeCourse/:id
// @access  Private
exports.removeCourse = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  console.log(user);
  if (!user.courses.includes(req.params.id)) {
    return next(new ErrorResponse("This course is already removed"), 500);
  }

  let courses = user.courses.filter((item) => item != req.params.id);

  console.log(courses);

  user = await User.findByIdAndUpdate(req.user.id, { courses: courses });

  return res.status(200).json({ success: true, data: user });
});
