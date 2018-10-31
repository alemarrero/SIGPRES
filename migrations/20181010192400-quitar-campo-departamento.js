'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('usuarios', 'departamento');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuarios', 'departamento', {
      type: Sequelize.STRING
    });
  }
};