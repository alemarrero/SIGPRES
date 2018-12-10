'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('vinculacion_acciones_productos', 'producto_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',      
      references: {
        model: "productos",
        key: "id"
      },
     }, {
        timestamps: false
      });        
  }, 
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vinculacion_acciones_productos', 'producto_id', {
      timestamps: false
    })}
};