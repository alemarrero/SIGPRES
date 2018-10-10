'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('programas', 'direccion_id');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('programas', 'direccion_id', {
      allowNull: false,
      type: DataTypes.INTEGER
    });
  }
};