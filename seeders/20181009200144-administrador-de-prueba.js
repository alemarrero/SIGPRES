'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      nombre: "Administrador",
      apellido: "de Prueba",
      cedula: "V-1234567",
      fecha_ingreso: "2000-01-02",
      fecha_nacimiento: "2000-01-01",
      departamento: "IT",
      cargo: "Director de IT",
      rol: "administrador",
      habilitado: true,
      correo: 'admin@admin.com',
      usuario: 'admin',
      password: "$2b$10$5prGTct1Pd60NJ1QJtyRbuPiOr4ilhoqZj65//7T/ta/4PRQH7FOm"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {where: {usuario: 'admin' }});
  }
};
