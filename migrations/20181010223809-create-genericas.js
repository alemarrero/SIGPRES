'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('genericas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_generica: {
        type: Sequelize.INTEGER
      },
      partida_presupuestaria_id: {
        type: Sequelize.INTEGER
      },
      denominacion: {
        type: Sequelize.STRING
      },
      habilitada: {
        type: Sequelize.BOOLEAN
      }
    }, {
        timestamps: false,
        freezeTableName: true
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('genericas');
  }
};