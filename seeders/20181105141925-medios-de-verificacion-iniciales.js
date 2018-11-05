'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('medios_de_verificacion', [
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
    return queryInterface.bulkDelete('medios_de_verificacion', null, {});
  }
};
