'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('usuarios', 'departamento');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuarios', 'departamento', {
      type: DataTypes.STRING,
      allowNull: false
    });
  }
};