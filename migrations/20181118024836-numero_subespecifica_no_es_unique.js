'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('subespecificas', 'subespecificas_numero_subespecifica_key');    
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
