const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const userData = await user.save();

    return res.status(400).json({
      success: true,
      message: "Registered Successfully!",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });

  return token;
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errors",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "Email and Password Incorrect!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Email and Password Incorrect!",
      });
    }

    const accessToken = await generateAccessToken({ user: userData });

    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      access_token: accessToken,
      token_type: "Bearer",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user_id = req.user_id;
    const userData = await User.findById({ _id: user_id });

    return res.status(400).json({
      success: true,
      message: "Profile Data",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, getProfile };
