'use strict';

export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  //  return Promise.all([
  //   queryInterface.removeColumn(
  //     'Users',
  //     'name',
  //     {
  //       type: Sequelize.STRING
  //     }
  //   ),
  //   queryInterface.changeColumn(
  //     'Posts',
  //     'body',
  //     {
  //       type: Sequelize.STRING(5000)
  //     }
  //   ),
  //   queryInterface.addColumn(
  //     'Posts',
  //     'image',
  //     {
  //       type: Sequelize.STRING
  //     }
  //   ),queryInterface.addColumn(
  //     'Posts',
  //     'timetoRead',
  //     {
  //       type: Sequelize.INTEGER
  //     }
  //   ),
  //   queryInterface.changeColumn(
  //     'Comments',
  //     'body',
  //     {
  //       type: Sequelize.STRING(1000)
  //     }
  //   ),
  //   queryInterface.removeColumn(
  //     'Comments',
  //     'title',
  //     {
  //       type: Sequelize.STRING
  //     }
  //   )
  // ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
