'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      return queryInterface.bulkInsert('usuarios', [
        {
          nombre: "Administrador",
          apellido: "de Prueba",
          cedula: "V-1234567",
          fecha_ingreso: "2000-01-02",
          fecha_nacimiento: "2000-01-01",
          area_id: process.env.AREA_ID,
          cargo: "Director de Tecnología de Información y Comunicación",
          rol: "administrador",
          habilitado: true,
          correo: 'admin@admin.com',
          usuario: 'admin',
          password: "$2b$10$5prGTct1Pd60NJ1QJtyRbuPiOr4ilhoqZj65//7T/ta/4PRQH7FOm"
        },
        {
          nombre: "Director",
          apellido: "de Prueba",
          cedula: "V-1234567",
          fecha_ingreso: "2000-01-02",
          fecha_nacimiento: "2000-01-01",
          area_id: process.env.AREA_ID,
          cargo: "Director de Tecnología de Información y Comunicación",
          rol: "director",
          habilitado: true,
          correo: 'director@director.com',
          usuario: 'director',
          password: "$2b$10$5prGTct1Pd60NJ1QJtyRbuPiOr4ilhoqZj65//7T/ta/4PRQH7FOm"
        },
        {
          nombre: "Usuario regular",
          apellido: "de Prueba",
          cedula: "V-1234567",
          fecha_ingreso: "2000-01-02",
          fecha_nacimiento: "2000-01-01",
          area_id: process.env.AREA_ID,
          cargo: "Secretario",
          rol: "regular",
          habilitado: true,
          correo: 'usuario@usuario.com',
          usuario: 'usuario',
          password: "$2b$10$5prGTct1Pd60NJ1QJtyRbuPiOr4ilhoqZj65//7T/ta/4PRQH7FOm"
        },
      ], {});
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {where: {usuario: 'admin' }});
  }
};