'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subespecificas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_subespecifica: {
        allowNull: false,
        type: Sequelize.STRING
      },
      especifica_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      denominacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      habilitada: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    }, {
        timestamps: false,
        freezeTableName: true
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subespecificas');
  }
};