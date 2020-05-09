const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Comment = require("../models/Comment");
const QuestionBank = require("../models/QuestionBank");
const User = require("../models/User");

// @desc  Create Comment
// @route POST comments/:questionBankId
// @access  Public
exports.createComment = asyncHandler(async (req, res, next) => {
  const comment = Comment.create({
    user: req.user,
    questionBank: req.params.questionBankId,
    text: req.body.text,
  });
  res.status(200).json({ success: true, data: comment });
});
