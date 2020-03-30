const express = require("express");
const router = express.Router();

const { protected } = require("../middlewares/auth");
const { getLogin, login, register } = require("../conrollers/auth");
router
  .route("/login")
  .get(protected, getLogin)
  .post(login);

router.route("/register").post(register);
module.exports = router;
