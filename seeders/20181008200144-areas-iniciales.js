'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('areas', [
      {
        nombre: "DC",
        habilitado: true,
        descripcion: "Despacho del Contralor",
      },
      {
        nombre: "UAI",
        habilitado: true,
        descripcion: "Unidad de Auditoría Interna",
      },
      {
        nombre: "OAC",
        habilitado: true,
        descripcion: "Oficina de Atención al Ciudadano",
      },
      {
        nombre: "DGIAJ",
        habilitado: true,
        descripcion: "Dirección de Gestión Interna y Asuntos Jurídicos",
      },
      {
        nombre: "DG",
        habilitado: true,
        descripcion: "Dirección General",
      },
      {
        nombre: "DDR",
        habilitado: true,
        descripcion: "Dirección de Determinación de Responsabilidades",
      },
      {
        nombre: "DPPCG",
        habilitado: true,
        descripcion: "Dirección de Planificación, Presupuesto y Control de Gestión",
      },
      {
        nombre: "DRH",
        habilitado: true,
        descripcion: "Dirección de Recursos Humanos",
      },
      {
        nombre: "DASG",
        habilitado: true,
        descripcion: "Dirección de Administración y Servicios Generales",
      },
      {
        nombre: "DTIC",
        habilitado: true,
        descripcion: "Dirección de Tecnología de Información y Comunicación",
      },
      {
        nombre: "DCP",
        habilitado: true,
        descripcion: "Dirección de Control Posterior",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('areas', null, {});
  }
};
