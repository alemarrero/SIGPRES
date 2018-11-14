'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("antecedentes", [
      {
        periodo: "2018-2023",
        mision: "Fortalecer el control de vigilancia, protección y salvaguarda del patrimonio público y la gestión municipal, en la búsqueda de la eficiencia, eficacia y transparencia, mediante la coordinacion de sus integrantes para la aplicación de las mejores prácticas de control de fiscal y la participación ciudadana.",
        vision: "Consolidarnos como el paradigma de control fiscal municipal, confiable, profesional, eficaz y eficiente de alto nivel técnico, con el enfoque de obtener los mejores resultados que garantice la buena calidad de vida de los ciudadanos del Municipio Baruta, del Estado Bolivariano de Miranda.",
        debilidades: "Debilidades de la CMB",
        fortalezas: "Fortalezas de la CMB",
        amenazas: "Amenazas de la CMB",
        oportunidades: "Oportunidades de la CMB",
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('antecedentes', null, {});
  }
};
