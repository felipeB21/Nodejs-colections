const db = require("../database/models/index");

module.exports = {
  getPost: async (req, res) => {
    const userName = req.session.userName;
    const userId = req.session.userId;
    try {
      const posts = await db.Post.findAll({
        include: [
          {
            model: db.User,
            as: "users",
            attributes: ["name", "last_name"],
          },
        ],
      });

      res.render("discover", {
        posts,
        userName: userName ? userName : null,
        userId: userId ? userId : null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los posts" });
    }
  },
  processPost: async (req, res) => {
    try {
      const { title, user_id } = req.body;

      // Verificar si se subieron archivos de imagen
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({
            error: "Título y al menos una foto son campos obligatorios",
          });
      }

      // Obtener nombres de archivos de imágenes subidas
      const photos = req.files.map((file) => file.filename);

      // Crear un nuevo post en la base de datos
      const newPost = await db.Post.create({
        title,
        photos,
        user_id,
      });

      res.status(201).json({ post: newPost });
    } catch (error) {
      console.error(error);

      if (error.name === "SequelizeValidationError") {
        const validationErrors = error.errors.map((err) => ({
          message: err.message,
          type: err.type,
          path: err.path,
        }));

        res
          .status(400)
          .json({ error: "Error de validación", details: validationErrors });
      } else {
        res
          .status(500)
          .json({ error: "Error al procesar el post", details: error.message });
      }
    }
  },
};
