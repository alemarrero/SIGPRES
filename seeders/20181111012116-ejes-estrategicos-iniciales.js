'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ejes_estrategicos', [
      {
        nombre: "Fortalecimiento de los procesos inherentes al control fiscal, así como su interrelación",
        descripcion: "Descripción",
        antecedente_id: 1
      },
      {
        nombre: "Fortalecer los procesos medulares y optimizar el control del patrimonio público municipal",
        descripcion: "Descripción",
        antecedente_id: 1
      },
      {
        nombre: "Afianzar la participación activa y protagónica de la comunidad baruteña en la gestión de recursos públicos",
        descripcion: "Descripción",
        antecedente_id: 1
      },
      {
        nombre: "Mejoramiento continuo en los procesos de gestión",
        descripcion: "Descripción",
        antecedente_id: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ejes_estrategicos', null, {});
  }
};
