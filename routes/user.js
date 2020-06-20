const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const {
  updateUser,
  uploadAvatar,
  getUserCourse,
  updateUserCourse,
  addCourse,
  removeCourse
} = require("../conrollers/user");
const { imageUpload } = require("../middlewares/file");
router.route("/").put(protected, updateUser);

router


  .route("/avatar")
  .put(protected, imageUpload, uploadAvatar)
  .post(protected, imageUpload, uploadAvatar);

router.route("/courses/:questionBankId").put(protected, updateUserCourse);
router.route("/courses").get(protected, getUserCourse);
router.route("/addCourse/:id").post(protected, addCourse)
router.route("/removeCourse/:id").post(protected, removeCourse)
module.exports = router;
