'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('planes_alcaldia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      periodo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      habilitado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      fichero: {
        allowNull: false,
        type: Sequelize.STRING
      },
      enlace: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('planes_alcaldia');
  }
};