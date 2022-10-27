'use strict';
import { Model } from 'sequelize';
import client from '../config/elasticsearch';
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
  Posts.addHook(
    'afterCreate',
    'insertIntoElasticSearch',
    async (post, options) => {
      const { transaction } = options;
      let readDataValues = await Posts.findOne({
        where: {
          id: post.id,
        },
        include: {
          model: sequelize.models.Users,
          as: 'postedBy',
        },
        transaction,
      });
      readDataValues.dataValues.postedBy =
        readDataValues.dataValues.postedBy.dataValues;
      console.log(readDataValues.dataValues);
      await client.index({
        index: 'posts',
        body: readDataValues.dataValues,
      });
    }
  );

  return Posts;
};
