const express = require("express");
const authController = require("../controllers/authController");
const { registerValidator } = require("../helpers/validator");
const { registerUser } = require("../controllers/authController");

const router = express();

router.post("/register", registerValidator, registerUser);

module.exports = router;
