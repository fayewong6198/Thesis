const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const {
  createNote,
  getNote,
  getUserNote,
  UpdateUserNote,
  voteUserNote,
} = require("../conrollers/note");

router.route("/:key").post(protected, createNote);
router.route("/:key").get(protected, getNote);
router
  .route("/:key/user")
  .get(protected, getUserNote)
  .put(protected, UpdateUserNote);

router.route("/:key/:user/vote").post(voteUserNote);
module.exports = router;
