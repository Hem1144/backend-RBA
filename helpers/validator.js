const { check } = require("express-validator");

exports.registerValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please provide a valid email")
    .not()
    .isEmpty()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password is required").not().isEmpty(),
];

exports.loginValidator = [
  check("email", "Please provide a valid email")
    .not()
    .isEmpty()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password is required").not().isEmpty(),
];
