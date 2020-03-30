const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Question = require("../models/Question");
const QuestionBank = require("../models/QuestionBank");
const User = require("../models/User");
const Chapter = require("../models/Chapter");

// @desc  Create a question bank
// @route GET/auth/login
// @access  Public
exports.createQuestionBank = asyncHandler(async (req, res, next) => {
  console.log("Success");
  console.log(req.body[0]);
  const questionBank = await QuestionBank.create({
    name: "Chemistry",
    user: req.user.id
  });

  const chapter1 = await Chapter.create({
    name: "Chapter 1",
    questionBank: questionBank
  });

  const chapter2 = await Chapter.create({
    name: "Chapter 2",
    questionBank: questionBank
  });

  const chapter3 = await Chapter.create({
    name: "Chapter 3",
    questionBank: questionBank
  });

  const chapter4 = await Chapter.create({
    name: "Chapter 4",
    questionBank: questionBank
  });

  const chapter5 = await Chapter.create({
    name: "Chapter 5",
    questionBank: questionBank
  });

  const chapter6 = await Chapter.create({
    name: "Chapter 6",
    questionBank: questionBank
  });

  req.body.forEach(question => {
    let chapter = chapter1;
    if (question.chapter == 2) chapter = chapter2;
    else if (question.chapter == 3) chapter = chapter3;
    else if (question.chapter == 4) chapter = chapter4;
    else if (question.chapter == 5) chapter = chapter5;
    else if (question.chapter == 6) chapter = chapter6;
    Question.create({
      text: question.text,
      answer: question.answer,
      rightAnswer: question.rightAnswer,
      difficulty: question.difficulty,
      time: question.time,
      chapter: chapter._id,
      knowledge: question.knowledge,
      questionBank: questionBank
    });
  });
  res.status(200).json({ success: true });
});

exports.getQuestionBanks = asyncHandler(async (req, res, next) => {
  console.log("con cac");
  console.log(req.user);
  console.log(req.user.id);
  const questionBanks = await QuestionBank.find({ user: req.user.id });

  return res.status(200).json({ success: true, data: questionBanks });
});

// @desc  Get Chapter QuestionBank
// @route GET questionBank/:id
// @access  Private
exports.getChapters = asyncHandler(async (req, res, next) => {
  const chapters = await Chapter.find({ questionBank: req.params.id });

  console.log(chapters);
  return res.status(200).json({ success: true, data: chapters });
});

// @desc  Generate Test Quiz
// @route POST questionBank/quiz
// @access  Private
exports.generateQuiz = asyncHandler(async (req, res, next) => {
  let chapters = [];
  for (let key in req.body.chapters)
    if (
      req.body.chapters.hasOwnProperty(key) &&
      req.body.chapters[key] === true
    )
      chapters.push(key);

  let question = await Question.find({ chapter: { $in: chapters } }).limit(20);

  console.log(question);
  return res.status(200).json({ success: true, data: question });
});
