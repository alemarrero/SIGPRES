'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('requerimientos_personal', 'cargo_id', {
      type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'cargos',
          key: 'id'
        },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('requerimientos_personal', 'cargo_id', {
      timestamps: false
    });
  }
};