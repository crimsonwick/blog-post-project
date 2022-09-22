"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Posts, { foreignKey: "userId", as: "Posts" });
      Users.hasMany(models.Comments, { foreignKey: "userId", as: "Comments" });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn("uuid_generate_v4"),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetLink: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING(1000)
      }
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
