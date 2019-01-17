'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('acciones_recurrentes', 'accion_recurrente', { 
      type: Sequelize.STRING(2000)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('acciones_recurrentes', 'accion_recurrente', { 
      type: Sequelize.STRING
    })
  }
};