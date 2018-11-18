'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('genericas', 'genericas_numero_generica_key');
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
