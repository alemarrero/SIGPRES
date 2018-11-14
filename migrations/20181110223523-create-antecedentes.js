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
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      vision: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      debilidades: {
        type: Sequelize.STRING(2000),
        allowNull: true
      },
      fortalezas: {
        type: Sequelize.STRING(2000),
        allowNull: true
      },
      amenazas: {
        type: Sequelize.STRING(2000),
        allowNull: true
      },
      oportunidades: {
        type: Sequelize.STRING(2000),
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