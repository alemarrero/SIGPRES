'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('usuarios', 'usuario', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('usuarios', 'usuario', {
      type: Sequelize.STRING,
      allowNull: false
    }, {
      timestamps: false
    });
  }
};