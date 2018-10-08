'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('areas');
  }
};