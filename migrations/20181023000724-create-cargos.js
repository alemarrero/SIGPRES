'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cargos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      cargo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cargos');
  }
};