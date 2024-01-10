const { v4: uuidv4 } = require("uuid");
const { createHash } = require("crypto");

module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(18),
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    tableName: "users",
  };
  const User = sequelize.define(alias, cols, config);
  User.beforeCreate((user) => {
    user.id = uuidv4();
  });

  User.associate = function (models) {
    User.hasMany(models.Post, {
      as: "posts",
      foreign_key: "user_id",
    });
  };

  return User;
};
