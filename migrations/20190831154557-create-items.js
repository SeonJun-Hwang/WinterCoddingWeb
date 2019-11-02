'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      lecture: {
        allowNull: false,
        type: Sequelize.STRING
      },
      professor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start_time:{
        allowNull: false,
        type: Sequelize.STRING
      },
      end_time:{
        allowNull: false,
        type: Sequelize.STRING
      },
      dayofweek:{
        allowNull: false,
        type: Sequelize.STRING
      },
      description:{
        allowNull: true,
        type: Sequelize.STRING(500)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};