'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('usuarios', 'habilitado', { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('usuarios', 'habilitado', { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  }
};
