"use strict";
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Comments", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "u_id",
      },
      allowNull: false,
    },
    parentId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Comments",
        key: "id",
      },
      defaultValue: null,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
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
  await queryInterface.dropTable("Comments");
}
