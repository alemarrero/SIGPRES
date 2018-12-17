'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('antecedentes', 'objetivo_general', {
      type: Sequelize.STRING(2000),
      allowNull: false,
      defaultValue: "Objetivo General"
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('antecedentes', 'objetivo_general', {
      timestamps: false
    });
  }
};