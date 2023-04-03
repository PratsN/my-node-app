const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { isUpper, isLower } = require("../middleware/string.validator");

const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("REQUEST-BODY", req.body);
    const isUserAlreadyRegistered = await User.findOne({ email: email }).lean();
    if (isUserAlreadyRegistered) {
      return res
        .status(403)
        .json({ err: "Account already exists with this email address" });
    }

    if (
      !isUpper(password) ||
      !isLower(password) ||
      password.length < 8 ||
      validator.isAlphanumeric(password)
    ) {
      return res.status(400).json({
        err: "Password should contain atleast one uppercase, one lowercase , length must be greater or equal to 8 and it should be alphanumeric",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    const newRegisteredUserObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    };

    const newUserRegistration = new User(newRegisteredUserObject);
    const isNewUserRegisteredOrNot = newUserRegistration.save();

    return res.status(200).json(isNewUserRegisteredOrNot);
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserRegisteredOrNot = await User.findOne({ email: email }).lean();
    if (!isUserRegisteredOrNot) {
      return res
        .status(404)
        .json({ err: "No User Registered with us with this email address" });
    }

    const isPasswordEnteredByUserIsCorrectOrNot = await bcrypt.compare(
      password,
      isUserRegisteredOrNot.password
    );

    if (!isPasswordEnteredByUserIsCorrectOrNot) {
      return res.status(403).json({ err: "Incorrect Password" });
    }

    const userToken = jwt.sign({ data: { email: email } }, JWT_KEY);
    console.log("LOGIN USER ::: ", email);
    return res.status(200).json({
      email: email,
      firstName: isUserRegisteredOrNot.firstName,
      lastName: isUserRegisteredOrNot.lastName,
      token: userToken,
    });
  } catch (err) {
    res.status(404).json("Something went wrong");
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserRegisteredOrNot = await User.findOne({ email: email }).lean();
    if (!isUserRegisteredOrNot) {
      return res
        .status(404)
        .json({ err: "No User Registered with us with this email address" });
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    const result = await User.updateOne(
      { email: email },
      {
        $set: { password: encryptedPassword },
      }
    );

    console.log("#############", result);
    return res.status(200).json({ success: "Password Changed Successfully" });
  } catch (err) {
    console.log("ERR :::: ", err);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  forgetPassword,
};
