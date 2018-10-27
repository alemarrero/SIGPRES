'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sugerencias', 'identificador', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('sugerencias', 'identificador', {
      timestamps: false
    });
  }
};