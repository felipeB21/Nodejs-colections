const { body } = require("express-validator");

module.exports = [
  body("file").notEmpty().withMessage("Please select a file to continue."),
];
