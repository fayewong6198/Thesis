const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

exports.protected = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("You have to login", 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, "secret");

    // set req.user
    req.user = await User.findById(decoded.id).populate("courses notes");
    // .populate("courses");

    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("You have to login", 401));
  }
});
