'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sugerencia_presupuesto_participativo', 'fecha', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('sugerencia_presupuesto_participativo', 'fecha', {
      timestamps: false
    });
  }
};