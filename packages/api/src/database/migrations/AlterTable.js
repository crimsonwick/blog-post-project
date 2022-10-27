'use strict';
export async function up(queryInterface, Sequelize) {
  return await queryInterface.renameColumn('Posts', 'timetoRead', 'timeToRead');
}
