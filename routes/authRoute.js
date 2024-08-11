const express = require("express");
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../helpers/validator");
const auth = require("../middlewares/authMiddleware");

const router = express();

router.post("/register", registerValidator, authController.registerUser);
router.post("/login", loginValidator, authController.loginUser);
router.get("/profile", auth, authController.getProfile);

module.exports = router;
