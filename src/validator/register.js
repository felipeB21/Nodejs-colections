const { body } = require("express-validator");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 1, max: 30 })
    .withMessage("Name must be between 1 and 30 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .isLength({ min: 1, max: 30 })
    .withMessage("Last name must be between 1 and 30 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 4, max: 18 })
    .withMessage("Password must be between 4 and 18 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
];
