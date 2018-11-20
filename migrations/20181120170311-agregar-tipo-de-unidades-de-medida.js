'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('unidades_de_medida', 'tipo', 
    { 
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'acciones recurrentes',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('unidades_de_medida', 'tipo');
  }
};
