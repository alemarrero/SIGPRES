'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('requerimientos_personal', 'solicitud_personal_id', {
      type: Sequelize.INTEGER,
        references: {
          model: 'solicitud_personal',
          key: 'id'
        },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('requerimientos_personal', 'solicitud_personal_id', {
      timestamps: false
    });
  }
};