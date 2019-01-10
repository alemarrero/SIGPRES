'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('objetivos_especificos', 'objetivo', { 
      type: Sequelize.STRING(2000)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('objetivos_especificos', 'objetivo', { 
      type: Sequelize.STRING
    })
  }
};
