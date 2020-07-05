const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const {
  createComment,
  getQuestionComments,
  createQuestionComment,
  updateQuestionComment,
  deleteQuestionComment,
} = require("../conrollers/comment");

router.route("/").post(protected, createComment);
router
  .route("/:id/question")
  .get(protected, getQuestionComments)
  .post(protected, createQuestionComment);

router
  .route("/:id")
  .put(protected, updateQuestionComment)
  .delete(protected, deleteQuestionComment);

module.exports = router;
