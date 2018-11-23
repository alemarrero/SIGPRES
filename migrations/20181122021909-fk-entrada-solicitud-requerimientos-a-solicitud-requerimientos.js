'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'solicitud_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',      
      references: {
        model: "solicitudes_de_requerimientos",
        key: "id"
      },
     }, {
        timestamps: false
      });        
  }, 
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'solicitud_id', {
      timestamps: false
    })}
};