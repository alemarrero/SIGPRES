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
        allowNull: false,
        unique: true,           
        type: Sequelize.STRING
      },
      partida_presupuestaria_id: {
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
    return queryInterface.dropTable('genericas');
  }
};