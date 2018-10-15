'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('especificas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_especifica: {
        allowNull: false,
        unique: true,           
        type: Sequelize.STRING
      },
      generica_id: {
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
    return queryInterface.dropTable('especificas');
  }
};