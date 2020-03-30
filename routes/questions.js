const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const {
  createQuestionBank,
  getQuestionBanks,
  getChapters,
  generateQuiz
} = require("../conrollers/questions");
router.route("/createQuestionBank").post(protected, createQuestionBank);

router.route("/chapters/:id").get(protected, getChapters);

router.route("/user").get(protected, getQuestionBanks);

router.route("/quiz").post(protected, generateQuiz);

module.exports = router;
