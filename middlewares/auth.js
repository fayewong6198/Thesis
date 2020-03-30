const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

exports.protected = asyncHandler(async (req, res, next) => {
  let token;

  console.log("Header ", req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log("Token");
  console.log(token);

  if (!token) {
    return next(new ErrorResponse("You have to login", 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, "secret");
    console.log("concac");
    console.log(decoded);

    // set req.user
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("You have to login", 401));
  }
});
