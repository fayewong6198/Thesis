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
  createUserQuestion,
  getUserQuestion,
  updateUserQuestion,
  deleteUserQuestion,
  getUserQuestions,
  getQuestionsWhileDoingQuiz,
  submitQuiz,
  getUserChapter,
} = require("../conrollers/questions");
router
  .route("/")
  .get(protected, getAllQuestionBanks)
  .post(protected, createUserQuestion);

router
  .route("/:id/user")
  .get(protected, getUserQuestion)
  .put(protected, updateUserQuestion)
  .delete(protected, deleteUserQuestion);

router.route("/createQuestionBank").post(protected, createQuestionBank);

router.route("/chapters/:id").get(protected, getChapters);

router.route("/user").get(protected, getQuestionBanks);

router.route("/user/chapters/:id").get(protected, getUserChapterQuestionBanks);
router.route("/quiz").post(protected, generateQuiz);

router
  .route("/:questionBankId/chapter/:chapterId")
  .get(protected, getUserQuestions);

router.route("/:chapterId/quiz").get(protected, getQuestionsWhileDoingQuiz);

router.route("/submit").post(protected, submitQuiz);
router.route("/userChapter").post(protected, getUserChapter);
module.exports = router;
