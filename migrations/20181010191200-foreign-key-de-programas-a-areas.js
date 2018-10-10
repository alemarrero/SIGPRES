'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('programas', 'area_id', {
      type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'areas',
          key: 'id'
        },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('programas', 'area_id', {
      timestamps: false
    });
  }
};