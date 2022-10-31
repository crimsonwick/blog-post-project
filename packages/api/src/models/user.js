'use strict'
import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'
export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Posts, { foreignKey: 'userId', as: 'Posts' })
      Users.hasMany(models.Comments, { foreignKey: 'userId', as: 'Comments' })
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn('uuid_generate_v4'),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      resetLink: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    },
  )

  Users.addHook('beforeCreate', 'hashPassword', async (user, options) => {
    user.password =
      user.password && user.password != ''
        ? bcrypt.hashSync(user.password, 10)
        : ''
  })
  Users.addHook('beforeSave', 'hashChangePassword', async (user, options) => {
    user.password =
      user.password && user.password != ''
        ? bcrypt.hashSync(user.password, 10)
        : ''
  })
  return Users
}
