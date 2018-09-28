'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bitacoras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
          as: 'usuario_id',
        }
      },
      accion: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      timestamps:false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bitacoras');
  }
};