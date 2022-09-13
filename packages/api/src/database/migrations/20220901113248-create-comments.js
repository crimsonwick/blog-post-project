"use strict";
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Comments", {
    c_id: {
      allowNull: false,
      defaultValue: Sequelize.fn("uuid_generate_v4"),
      primaryKey: true,
      type: Sequelize.UUID,
    },
    postId: {
      type: Sequelize.UUID,
      references: {
        model: "Posts",
        key: "p_id",
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
      type: Sequelize.UUID,
      references: {
        model: "Comments",
        key: "c_id",
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
