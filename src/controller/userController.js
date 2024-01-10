const db = require("../database/models/index");
const jwt = require("jsonwebtoken");

module.exports = {
  processRegister: async (req, res) => {
    try {
      const existingUser = await db.User.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        res.status(400).send("Email already exist");
      } else {
        const newUser = await db.User.create({
          name: req.body.name,
          last_name: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });

        if (newUser) {
          req.session.userId = newUser.id;
          req.session.userName = newUser.name;
          req.session.userLastName = newUser.last_name;
          req.session.userEmail = newUser.email;
        } else {
          res.status(500).send("Failed to create user");
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  },

  processLogin: async (req, res) => {
    const user = await db.User.findOne({
      where: {
        email: req.body.emailLogin,
      },
    });
    if (!user) return res.json({ message: "Email or password does not match" });
    if (user.password != req.body.passwordLogin)
      return res.json({ message: "Email or password does not match" });
    if (user) {
      req.session.userId = user.id;
      req.session.userName = user.name;
      req.session.userLastName = user.last_name;
      req.session.userEmail = user.email;
    }
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    req.body.isLogged = jwtToken;
    res.redirect("/");
  },
};
