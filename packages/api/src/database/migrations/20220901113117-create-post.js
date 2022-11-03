'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Posts', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING(5000),
    },
    image: {
      type: Sequelize.STRING(1000),
    },
    timetoRead: {
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable('Posts');
}
