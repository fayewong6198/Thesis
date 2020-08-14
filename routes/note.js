const express = require("express");
const router = express.Router();

const {protected} = require("../middlewares/auth");
const {
    createNote,
    getNote,
    getNotes,
    getUserNote,
    UpdateUserNote,
    voteUserNote,
    noteImageUpload,
    deleteNoteImage
} = require("../conrollers/note");

router.route("").get(getNotes);
router.route("/:key").post(protected, createNote);
router.route("/:key").get(protected, getNote);
router.route("/:key/user").get(protected, getUserNote).put(protected, UpdateUserNote);

router.route("/:key/:user/vote").post(voteUserNote);
router.route("/:key/images").put(noteImageUpload);
router.route("/:key/images/:imageId").delete(deleteNoteImage);

module.exports = router;
