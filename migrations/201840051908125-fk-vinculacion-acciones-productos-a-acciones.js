'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('vinculacion_acciones_productos', 'accion_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',      
      references: {
        model: "acciones_recurrentes",
        key: "id"
      },
     }, {
        timestamps: false
      });        
  }, 
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vinculacion_acciones_productos', 'accion_id', {
      timestamps: false
    })}
};