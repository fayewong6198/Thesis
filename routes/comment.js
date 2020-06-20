const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const {
  createComment,
  getQuestionComments,
  createQuestionComment,
} = require("../conrollers/comment");

router.route("/").post(protected, createComment);
router
  .route("/:id/question")
  .get(protected, getQuestionComments)
  .post(protected, createQuestionComment);

module.exports = router;
