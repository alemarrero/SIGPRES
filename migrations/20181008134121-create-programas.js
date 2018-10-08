'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('programas', {
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
      fecha_inicio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha_finalizacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duracion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      direccion_id: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('programas');
  }
};