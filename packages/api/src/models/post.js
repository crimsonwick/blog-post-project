"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Users, { foreignKey: "userId", as: "Posted_By" });
      Posts.hasMany(models.Comments, { foreignKey: "postId", as: "Comments" });
    }
  }
  Posts.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "u_id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
