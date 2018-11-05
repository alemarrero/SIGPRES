'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('unidades_de_medida', [
      {
        nombre: "Informe",
        habilitado: true
      },
      {
        nombre: "Memo",
        habilitado: true
      },
      {
        nombre: "Nota",
        habilitado: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('unidades_de_medida', null, {});
  }
};
