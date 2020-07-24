const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserCourse = require("../models/UserCourse");
// @desc  Login Page
// @route GET/auth/login
// @access  Public
exports.getLogin = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});

// @desc  Login Page
// @route POST/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const body = req.body;

  console.log(body);

  const user = await User.findOne({ email: body.email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Email not found!", 404));
  }

  console.log(user);
  const isMatch = await user.comparePassword(body.password);

  if (!isMatch) {
    return next(new ErrorResponse("Password does not match!", 401));
  }

  const token = await user.getSignedJwtToken();

  res.status(200).json({ success: true, data: token });
});

// @desc  Register user
// @route POST/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const user = await User.create(req.body);

  console.log(user);

  if (!user) {
    return next(new ErrorResponse("Error", 500));
  }
  res.status(200).json({ success: true, msg: "Register successfull" });
});
