'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cargos', [
      {
        codigo: "01-03-100",
        cargo: "CLASE DIRECTORES",
        habilitado: true,
      },
      {
        codigo: "01-03-101",
        cargo: "Director General",
        habilitado: true,
      },
      {
        codigo: "01-03-102",
        cargo: "Director de Gestión Interna y Asuntos Jurídicos",
        habilitado: true,
      },
      {
        codigo: "01-03-103",
        cargo: "Director de Determinación de Responsabilidades",
        habilitado: true,
      },
      {
        codigo: "01-03-104",
        cargo: "Director de la oficina de Atención al Ciudadano",
        habilitado: true,
      },
      {
        codigo: "01-03-105",
        cargo: "Director de Tecnología de la Información y Comunicación",
        habilitado: true,
      },
      {
        codigo: "01-03-106",
        cargo: "Director Planificación, Presupuesto y Control de Gestión",
        habilitado: true,
      },
      {
        codigo: "01-03-107",
        cargo: "Director de Control Posterior",
        habilitado: true,
      },
      {
        codigo: "01-03-108",
        cargo: "Director de Recursos Humanos",
        habilitado: true,
      },
      {
        codigo: "01-03-109",
        cargo: "Director de Administración y Servicios Generales",
        habilitado: true,
      },
      {
        codigo: "01-03-110",
        cargo: "Auditor Interno",
        habilitado: true,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cargos', null, {});
  }
};
