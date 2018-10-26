'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('solicitudes_comunidad', 'sugerencia_presupuesto_participativo');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('sugerencia_presupuesto_participativo', 'solicitudes_comunidad');
  }
};