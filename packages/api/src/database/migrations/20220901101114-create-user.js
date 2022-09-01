"use strict";

import { sequelize } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    u_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultvalue: sequelize.fn("uuid_generate_v4"),
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
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
  await queryInterface.dropTable("Users");
}
