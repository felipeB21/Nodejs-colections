const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  let alias = "Post";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID, // Asegúrate de que este tipo de dato coincida con el tipo de dato en la tabla de usuarios
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    tableName: "posts",
  };
  const Post = sequelize.define(alias, cols, config);
  Post.beforeCreate((post) => {
    post.id = uuidv4();
  });
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      as: "usuario",
      foreignKey: "user_id",
    });
  };

  return Post;
};
