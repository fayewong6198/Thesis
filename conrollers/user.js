const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserCourse = require("../models/UserCourse");
const UserChapter = require("../models/UserChapter");
const QuestionBank = require("../models/QuestionBank");
const mongoose = require("mongoose");
const path = require("path");
const Chapter = require("../models/Chapter");
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
  console.log(req.user.courses);
  let ids = [];
  for (let i = 0; i < req.user.courses.length; i++) {
    ids.push(req.user.courses[i].questionBank);
  }
  const questionBanks = await QuestionBank.find({
    _id: { $in: ids },
  })
    .populate("user")
    .populate("chapters");

  return res.status(200).json({ success: true, data: questionBanks });
});

// @desc  Add course
// @route POST /user/addCourse/:id
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  const questionBank = await QuestionBank.findById(req.params.id);
  if (!questionBank) {
    return next(new ErrorResponse("Question Bank not found", 400));
  }
  let user = await User.findById(req.user.id);

  let course = await UserCourse.findOne({
    user: req.user._id,
    questionBank: questionBank,
  });
  // Check dupplicate
  if (course) {
    return next(new ErrorResponse("Course is already added"));
  }
  course = await UserCourse.create({
    user: req.user._id,
    questionBank: questionBank,
  });

  // Create UserChapter
  // UserChapter contain Elo ratings of user on that chapter
  chapters = await Chapter.find({ questionBank: questionBank });
  chapters = JSON.parse(JSON.stringify(chapters));

  for (let i = 0; i < chapters.length; i++) {
    await UserChapter.create({
      chapter: chapters[i]._id,
      userCourse: course._id,
    });
  }
  user = await User.findById(req.user.id);
  return res.status(200).json({ success: true, data: user });
});

// @desc  Remove course
// @route POST /user/removeCourse/:id
// @access  Private
exports.removeCourse = asyncHandler(async (req, res, next) => {
  let userCourse = await UserCourse.findOne({
    user: req.user._id,
    questionBank: req.params.id,
  });

  if (!userCourse) {
    return next(new ErrorResponse("This course is already removed", 400));
  }

  // delete chapter
  await UserChapter.deleteMany({ userCourse: userCourse });

  await userCourse.remove();

  return res.status(200).json({ success: true, data: {} });
});
