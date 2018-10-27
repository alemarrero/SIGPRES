'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('quejas', 'identificador', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('quejas', 'identificador', {
      timestamps: false
    });
  }
};