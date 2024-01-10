const db = require("../database/models/index");

module.exports = {
  home: (req, res) => {
    const userName = req.session.userName;
    const userId = req.session.userId;
    const userParamId = req.params.id;
    res.render("index", {
      userName: userName ? userName : null,
      userId: userId ? userId : null,
      userParamId: userParamId ? userParamId : null,
    });
  },
  upload: (req, res) => {
    const userName = req.session.userName;
    const userId = req.session.userId;
    res.render("upload", {
      userName: userName ? userName : null,
      userId: userId ? userId : null,
    });
  },
  signin: (req, res) => {
    const userName = req.session.userName;
    const errors = req.session.errorsLogin;
    const oldData = req.session.oldDataLogin;
    req.session.errorsLogin = null;
    req.session.oldDataLogin = null;
    res.render("signin", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userName: userName ? userName : null,
    });
  },
  signup: (req, res) => {
    const userName = req.session.userName;
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render("signup", {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
      userName: userName ? userName : null,
    });
  },
  displayUserProfile: async (req, res) => {
    const userName = req.session.userName;
    const userId = req.session.userId;
    try {
      // Verificar si el usuario está autenticado
      if (!req.session.userId) {
        return res.status(401).send("Unauthorized");
      }

      // Obtener el usuario desde la base de datos
      const user = await db.User.findByPk(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Renderizar la información del usuario en la página
      res.render("profile", {
        user,
        userName: userName ? userName : null,
        userId: userId ? userId : null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
