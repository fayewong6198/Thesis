const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const {
  createQuestionBank,
  getQuestionBanks,
  getChapters,
  generateQuiz,
  getAllQuestionBanks,
  getUserChapterQuestionBanks,
} = require("../conrollers/questions");
router.route("/").get(protected, getAllQuestionBanks);

router.route("/createQuestionBank").post(protected, createQuestionBank);

router.route("/chapters/:id").get(protected, getChapters);

router.route("/user").get(protected, getQuestionBanks);

router.route("/user/chapters/:id").get(protected, getUserChapterQuestionBanks);
router.route("/quiz").post(protected, generateQuiz);

module.exports = router;
