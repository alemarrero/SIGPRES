'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('propuestas_plan_operativo_anual', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'areas',
          key: 'id' 
        }
      },
      periodo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      enviada: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      aprobada: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      observaciones: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('propuestas_plan_operativo_anual');
  }
};