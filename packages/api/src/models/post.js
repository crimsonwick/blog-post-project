'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'postedBy' });
      Posts.hasMany(models.Comments, { foreignKey: 'postId', as: 'Comments' });
    }
  }
  Posts.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn('uuid_generate_v4'),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(1000),
      },
      timeToRead: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};
