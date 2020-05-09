const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const { createComment } = require("../conrollers/comment");

router.route("/").post(protected, createComment);
module.exports = router;
