const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Comment = require("../models/Comment");
const QuestionBank = require("../models/QuestionBank");
const User = require("../models/User");
const { request } = require("express");

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

// @desc  Get Question Comment by Id
// @route Get comments/:id/question
// @access  Private
exports.getQuestionComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    question: req.params.id,
  });

  res.status(200).json({ success: true, data: comments });
});

// @desc  Create Question Comment
// @route POST comments/:id/quesion
// @access  Private
exports.createQuestionComment = asyncHandler(async (req, res, next) => {
  const comment = Comment.create({
    user: req.user,
    question: req.params.id,
    text: req.body.text,
  });

  const comments = await Comment.find({
    question: req.params.id,
  });

  res.status(200).json({ success: true, data: comments });
});
