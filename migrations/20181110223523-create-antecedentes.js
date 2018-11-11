'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('antecedentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mision: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vision: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      debilidades: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fortalezas: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amenazas: {
        type: Sequelize.STRING,
        allowNull: true
      },
      oportunidades: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('antecedentes');
  }
};