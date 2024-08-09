const express = require("express");
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../helpers/validator");

const router = express();

router.post("/register", registerValidator, authController.registerUser);
router.post("/login", loginValidator, authController.loginUser);

module.exports = router;
