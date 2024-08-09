const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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

module.exports = { registerUser };
