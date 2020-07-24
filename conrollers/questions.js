const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Question = require("../models/Question");
const QuestionBank = require("../models/QuestionBank");
const User = require("../models/User");
const Chapter = require("../models/Chapter");
const userCourse = require("../models/UserCourse");
const userChapter = require("../models/UserChapter");
const mongoose = require("mongoose");
const UserCourse = require("../models/UserCourse");
const UserChapter = require("../models/UserChapter");
// Algorithm
const N = 500;
let TIME = 500;
const MAX_SIZE = TIME * 20;
const QUESTION_PER_TEST = TIME / 20;
let DIFFICULTY = 2.4;
const TIME_WEIGHT = 0.2;
const DIFFICULTY_WEIGHT = 0.8;
const THRESS_HOLD = 0.85;

const leftLineProba = (userDiff, standardDiff) => {
  return (1 / standardDiff) * userDiff;
};

const rightLineProba = (userDiff, standardDiff) => {
  return (-1 / (4 - standardDiff)) * (userDiff - standardDiff) + standardDiff;
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const average = (array) => {
  let result = 0;
  for (let i = 0; i < array.length; i++) result += array[i].difficulty;
  return result / array.length;
};

const abs = (number) => {
  return number > 0 ? number : -number;
};

const total = (array) => {
  let result = 0;
  for (let i = 0; i < array.length; i++) result += array[i].time;
  return result;
};

const error = (quiz) => {
  return (
    (TIME_WEIGHT * abs(total(quiz) - TIME)) / TIME +
    (DIFFICULTY_WEIGHT * abs(average(quiz) - DIFFICULTY)) / DIFFICULTY
  );
};

const fitnessFunction = (e) => {
  return (2 / (1 + e) - 1) * (2 / (1 + e) - 1) * (2 / (1 + e) - 1);
};

// @desc  Create a question bank
// @route GET/auth/login
// @access  Public
exports.createQuestionBank = asyncHandler(async (req, res, next) => {
  console.log("Success");
  console.log(req.body[0]);
  const questionBank = await QuestionBank.create({
    name: "Chemistry",
    user: req.user.id,
  });

  const chapter1 = await Chapter.create({
    name: "Chapter 1",
    questionBank: questionBank,
  });

  const chapter2 = await Chapter.create({
    name: "Chapter 2",
    questionBank: questionBank,
  });

  const chapter3 = await Chapter.create({
    name: "Chapter 3",
    questionBank: questionBank,
  });

  const chapter4 = await Chapter.create({
    name: "Chapter 4",
    questionBank: questionBank,
  });

  const chapter5 = await Chapter.create({
    name: "Chapter 5",
    questionBank: questionBank,
  });

  const chapter6 = await Chapter.create({
    name: "Chapter 6",
    questionBank: questionBank,
  });

  req.body.forEach((question) => {
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
      difficulty: Math.floor(Math.random() * 10) + 1,
      time: question.time,
      chapter: chapter._id,
      knowledge: question.knowledge,
      questionBank: questionBank,
    });
  });
  console.log("create question bank success full");
  res.status(200).json({ success: true });
});

// @desc  Get All QuestionBanks
// @route GET questions/
// @access  Private
exports.getAllQuestionBanks = asyncHandler(async (req, res, next) => {
  const questionBanks = await QuestionBank.find()
    .populate({ path: "user" })
    .populate({ path: "chapters", select: "name" });

  console.log(questionBanks);

  return res.status(200).json({ success: true, data: questionBanks });
});

// @desc  Get QuestionBank
// @route GET questions/user
// @access  Private
exports.getQuestionBanks = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  const questionBanks = await QuestionBank.find({ user: req.user.id });

  return res.status(200).json({ success: true, data: questionBanks });
});

// @desc  Get Chapter of QuestionBank
// @route GET questions/user/chapters/:id
// @access  Private
exports.getUserChapterQuestionBanks = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  console.log(req.params.id);
  const questionBanks = await QuestionBank.findOne({
    user: req.user.id,
    _id: req.params.id,
  });

  if (!questionBanks)
    return next(new ErrorResponse("QuestionBank not found", 404));
  const chapters = await Chapter.find({
    questionBank: req.params.id,
  });

  return res.status(200).json({ success: true, data: chapters });
});

// @desc  Get Question of QuestionBank by Chapter
// @route GET questions/:questionBankId/chapter/:chapterId
// @access  Private
exports.getUserQuestions = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  const questionBanks = await QuestionBank.findOne({
    user: req.user.id,
    _id: req.params.questionBankId,
  });

  console.log(questionBanks.user);
  if (!questionBanks) {
    return next(new ErrorResponse("Question not found", 404));
  }

  // if (
  //   questionBanks.user != mongoose.Types.ObjectId(req.user.id) ||
  //   req.user.role != "admin"
  // ) {
  //   console.log(questionBanks.user);
  //   return next(new ErrorResponse("UnAuthorized", 400));
  // }

  const questions = await Question.find({
    chapter: req.params.chapterId,
  });

  return res.status(200).json({ success: true, data: questions });
});

// @desc  Get Question of QuestionBank by Chapter
// @route GET questions/:id/user
// @access  Private
exports.getUserQuestion = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  const question = await Question.findOne({
    _id: req.params.id,
  });

  if (!question) {
    return next(new ErrorResponse("Question not found", 404));
  }

  if (question.user != req.user.id || req.user.role != "admin") {
    return next(new ErrorResponse("UnAuthorized", 400));
  }

  return res.status(200).json({ success: true, data: question });
});

// @desc  Update question
// @route UPDATE questions/:id/user
// @access  Private
exports.updateUserQuestion = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  let question = await Question.findById(req.params.id);

  if (!question) {
    return next(new ErrorResponse("Question not found", 404));
  }

  if (question.user != req.user.id || req.user.role != "admin") {
    return next(new ErrorResponse("UnAuthorized", 400));
  }

  question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({ success: true, data: question });
});

// @desc  Delete question
// @route DELETE questions/:id/user
// @access  Private
exports.deleteUserQuestion = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  let question = await Question.findById(req.params.id);

  if (!question) {
    return next(new ErrorResponse("Question not found", 404));
  }

  if (question.user != req.user.id || req.user.role != "admin") {
    return next(new ErrorResponse("UnAuthorized", 400));
  }

  question = await Question.findByIdAndDelete(req.params.id);

  return res.status(200).json({ success: true, data: question });
});

// @desc  Create question
// @route POST questions/
// @access  Private
exports.createUserQuestion = asyncHandler(async (req, res, next) => {
  const question = new Question(req.body);

  question.user = req.user.id;

  await question.save();

  return res.status(200).json({ success: true, data: question });
});

// @desc  Get Chapter QuestionBank
// @route GET questions/:id
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

  DIFFICULTY = req.body.diff;

  TIME = req.body.time || 500;
  for (let key in req.body.chapters)
    if (
      req.body.chapters.hasOwnProperty(key) &&
      req.body.chapters[key] === true
    )
      chapters.push(key);
  if (req.body.quiz == true) {
    chapter = chapters[0];

    let userCourse = await UserCourse.findOne({
      user: req.user.id,
      questionBank: req.body.questionBank,
    });

    if (!userCourse) {
      console.log(req.body);
      return next(new ErrorResponse("User course not found", 400));
    }

    let userChapter = await UserChapter.findOne({
      userCourse: userCourse,
      chapter: chapter,
    });

    console.log(userChapter);
    if (userChapter.elo == null) {
      console.log("userChapter.elo  is null");
      DIFFICULTY = 5;
    } else {
      console.log("userChapter.elo  is not null");

      // console.log(userChapter);
      DIFFICULTY = userChapter.elo;
      console.log(userChapter.elo);
      console.log(DIFFICULTY);
      if (DIFFICULTY < 3) {
        DIFFICULTY = 2;
      }
      if (DIFFICULTY > 8) {
        DIFFICULTY = 8;
      }
    }

    TIME = 100;
  }

  console.log("DIFFFFFFFFF ", DIFFICULTY);
  let questions = await Question.find({ chapter: { $in: chapters } }).populate({
    path: "chapter",
    select: "name",
  });

  JSON.parse(JSON.stringify(questions));
  if (DIFFICULTY >= 8) {
    questions = questions.filter((question) => question.difficulty >= 8);
  }
  if (DIFFICULTY <= 4) {
    questions = questions.filter((question) => question.difficulty <= 4);
  }

  let population = [];
  let test = [];

  for (let i = 0; i < MAX_SIZE; i++) {
    if ((i + 1) % QUESTION_PER_TEST != 0) {
      test.push(questions[i % questions.length]);
    } else {
      population.push(test);
      test = [];
    }
  }

  population.pop();

  // Error function
  let maxFitness = 0;
  let maxFitnessIndex = 0;
  population.forEach((pop) => {
    const fitness = fitnessFunction(error(pop));
    maxFitness = fitness > maxFitness ? fitness : maxFitness;
  });
  console.log(maxFitness);

  while (maxFitness < THRESS_HOLD) {
    for (let i = 0; i < population.length; i++) {
      // First Parent
      let a = Math.floor(Math.random() * population.length);
      let r = Math.random() * maxFitness;
      while (r > fitnessFunction(error(population[a]))) {
        a = Math.floor(Math.random() * population.length);
        r = Math.random() * maxFitness;
      }

      // Second Parent
      let b = Math.floor(Math.random() * population.length);
      r = Math.random() * maxFitness;
      while (r > fitnessFunction(error(population[b]))) {
        b = Math.floor(Math.random() * population.length);
        r = Math.random() * maxFitness;
      }

      const ids = new Set(population[a].map((data) => data.id));
      let merged = [
        ...population[a],
        ...population[b].filter((d) => !ids.has(d.id)),
      ];
      shuffleArray(merged);
      let time_test = 0;
      a = [];
      b = 0;

      while (time_test < TIME && b < merged.length) {
        a.push(merged[b]);

        time_test += merged[b].time;

        b++;
      }
      if (
        time_test - a[a.length - 1].time >
        a[a.length - 1].time - a[a.length - 2].time
      ) {
        a.pop();
      }
      population[i] = a;
      // Mutation Operator
      r = Math.random();
      if (r < 0.01) {
        let j = Math.floor(Math.random() * questions.length);
        let k = Math.floor(Math.random() * population[i].length);
        population[i][k] = questions[j];
      }
    }
    let averageFitness = 0;
    for (let i = 0; i < population.length; i++) {
      const fitness = fitnessFunction(error(population[i]));
      if (fitness > maxFitness) {
        maxFitness = fitness;
        maxFitnessIndex = i;
      }
      averageFitness += fitness;
    }

    console.log(averageFitness / population.length + " " + maxFitness);
  }
  console.log("Average difficulty: " + average(population[maxFitnessIndex]));
  console.log("Total time: " + total(population[maxFitnessIndex]) + "s");
  console.log("List of difficulty");

  population[maxFitnessIndex].map((p) => console.log(p.difficulty));

  console.log("Total Question", population[maxFitnessIndex].length);
  return res.status(200).json({
    success: true,
    data: population[maxFitnessIndex],
    total: population[maxFitnessIndex].length,
  });
});

// @desc  Get single Question while doing quiz
// @route POST questionBank/:chapterId/quiz
// @access  Private

exports.getQuestionsWhileDoingQuiz = asyncHandler(async (req, res, next) => {
  const chapter = await Chapter.findById(req.params.chapterId);

  if (!chapter) {
    return next(new ErrorResponse("Chapter Not Found", 404));
  }

  const questions = await Question.find({ chapter: chapter._id });

  if (questions.length == 0) {
    return next(new ErrorResponse("Chapter has no question"));
  }

  const { diff } = req.body;

  let index = Math.floor(Math.random() * questions.length);

  let probability = Math.random();

  while (probability < diff) {
    index = Math.floor(Math.random() * questions.length);
    probability = Math.random();
  }

  return res.status(200).json({ success: true, data: questions[index] });
});

// @desc  Submit quiz
// @route POST questionBank/submit
// @access  Private
exports.submitQuiz = asyncHandler(async (req, res, next) => {
  const userCourse = await UserCourse.findOne({
    user: req.user.id,
    questionBank: req.body.questionBank,
  });
  const userChapter = await UserChapter.findOne({
    userCourse: userCourse,
    chapter: req.body.chapter,
  });
  if (!userChapter) {
    return next(new ErrorResponse("USER CHAPTER NOT FOUND", 400));
  }
  userChapter.elo = req.body.elo;

  await userChapter.save();

  return res.status(200).json({ success: true, data: userChapter });
});

// @desc  Get UserChapter
// @route POST questionBank/userChapter
// @access  Private
exports.getUserChapter = asyncHandler(async (req, res, next) => {
  const userCourse = await UserCourse.findOne({
    user: req.user.id,
    questionBank: req.body.questionBank,
  });
  const userChapter = await UserChapter.findOne({
    userCourse: userCourse,
    chapter: req.body.chapter,
  });

  return res.status(200).json({ success: true, data: userChapter });
});
