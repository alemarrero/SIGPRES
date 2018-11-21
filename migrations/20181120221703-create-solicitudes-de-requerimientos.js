'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitudes_de_requerimientos', {
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
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "areas",
          key: "id"
        }
      },
      enviada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('solicitudes_de_requerimientos');
  }
};