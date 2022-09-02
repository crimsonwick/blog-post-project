"use strict";
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Posts", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "u_id",
      },
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING,
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
  await queryInterface.dropTable("Posts");
}
