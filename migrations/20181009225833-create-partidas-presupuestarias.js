'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('partidas_presupuestarias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_partida: {
        allowNull: false,
        unique: true,        
        type: Sequelize.INTEGER
      },
      denominacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      habilitado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      } 
    }, {
        timestamps: false,
        freezeTableName: true
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('partidas_presupuestarias');
  }
};