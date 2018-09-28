'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cedula: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'basico'
      },
      habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};