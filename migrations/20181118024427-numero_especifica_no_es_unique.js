'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('especificas', 'especificas_numero_especifica_key');

  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
