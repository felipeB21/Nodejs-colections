const { body } = require("express-validator");

module.exports = [
  body("emailLogin").notEmpty().withMessage("Invalid email"),
  body("passwordLogin").notEmpty().withMessage("Invalid password"),
];
