'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('objetivos_estrategicos', [
      {
        objetivo: "Fomentar e implementar los procesos de cambio y mejoramiento del control fiscal impulsado por la Contraloría General de la República",
        eje_estrategico_id: 1
      },
      {
        objetivo: "Mantener óptimas relaciones con todas las instituciones municipales destinatarias del Control Fiscal atribuido a la Contraloría Municipal",
        eje_estrategico_id: 1
      },
      {
        objetivo: "Impulsar la capacitación de los funcionarios de los órganos que integran el Sistema Nacional de Control Fiscal en la localidad",
        eje_estrategico_id: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('objetivos_estrategicos', null, {});
  }
};