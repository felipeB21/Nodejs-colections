module.exports = (req, res, next) => {
  const userEmailExists = req.session.userEmail;
  if (userEmailExists) {
    res.redirect("/");
  } else {
    next();
  }
};
