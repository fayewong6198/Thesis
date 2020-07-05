const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Comment = require("../models/Comment");
const QuestionBank = require("../models/QuestionBank");
const User = require("../models/User");
const Vote = require("../models/Vote");
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
  }).populate("user");

  res.status(200).json({ success: true, data: comments });
});

// @desc  Create Question Comment
// @route POST comments/:id/quesion
// @access  Private
exports.createQuestionComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.create({
    user: req.user,
    question: req.params.id,
    text: req.body.text,
  });

  console.log(comment);

  res.status(200).json({ success: true, data: comment });
});

// @desc  Edit Question Comment
// @route PUT comments/:id/
// @access  Private
exports.updateQuestionComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    return next(new ErrorResponse("Comment not found"));
  }

  if (comment.user != req.user || req.user.role != "admin") {
    return next(new ErrorResponse("Unauthorized"));
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  console.log(comment);

  res.status(200).json({ success: true, data: comment });
});

// @desc  Delete Question Comment
// @route Delete comments/:id/
// @access  Private
exports.deleteQuestionComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse("Comment not found"));
  }

  if (comment.user != req.user || req.user.role != "admin") {
    return next(new ErrorResponse("Unauthorized"));
  }

  comment = await Comment.findByIdAndUpdate(req.body);

  console.log(comment);

  res.status(200).json({ success: true, data: comment });
});

// @desc  Vote Question Comment
// @route POST comments/:id/vote
// @access  Private
exports.deleteQuestionComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse(`Note with ${id} not found`));
  }

  let vote = await Vote.findOne({ comment, user: req.user });

  console.log(req.body);

  if (vote) {
    vote.action = req.body.action;

    await vote.save();
  } else {
    vote = await Vote.create({
      comment,
      user: req.user,
      action: req.body.action,
    });
  }

  res.status(200).json({ success: true, data: vote });
});
