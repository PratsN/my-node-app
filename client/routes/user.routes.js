const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  forgetPassword,
} = require("../controller/user.controller");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/forgot", forgetPassword);
module.exports = router;
