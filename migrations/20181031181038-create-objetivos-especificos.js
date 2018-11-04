'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('objetivos_especificos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_actividad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 51
      },
      objetivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      propuesta_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'propuestas_plan_operativo_anual',
          key: 'id'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('objetivos_especificos');
  }
};