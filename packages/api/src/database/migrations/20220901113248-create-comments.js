'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
      primaryKey: true,
      type: Sequelize.UUID,
    },
    postId: {
      type: Sequelize.UUID,
      references: {
        model: 'Posts',
        key: 'id',
      },
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    parentId: {
      type: Sequelize.UUID,
      references: {
        model: 'Comments',
        key: 'id',
      },
      defaultValue: null,
    },
    body: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Comments');
}
