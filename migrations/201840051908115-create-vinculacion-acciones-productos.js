'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vinculacion_acciones_productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    }, {
        timestamps: false,
        freezeTableName: true
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vinculacion_acciones_productos');
  }
};