"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Posts, {
        foreignKey: "postId",
        as: "Commented_on",
      });
      Comments.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "Commented_By",
      });
      Comments.hasMany(models.Comments, {
        foreignKey: "parentId",
        as: "Replies",
      });
      Comments.belongsTo(models.Comments, {
        foreignKey: "parentId",
        as: "Replied_on",
      });
    }
  }
  Comments.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn("uuid_generate_v4"),
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      parentId: {
        type: DataTypes.UUID,
        references: {
          model: "Comments",
          key: "id",
        },
        defaultValue: null,
      },
      body: { type: DataTypes.STRING(1000), allowNull: false },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
