'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('entradas_solicitud_de_requerimientos', 'solicitud_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "solicitudes_de_requerimientos",
        key: "id"
      },  
      onDelete: 'CASCADE'        
    });
  },
  down: (queryInterface, Sequelize) => {
    return true;
  }
};