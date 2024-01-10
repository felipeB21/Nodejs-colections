const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.session.errorsLogin = errors.mapped();
    req.session.oldDataLogin = req.body;
    res.redirect("/signin");
  } else {
    next();
  }
};
