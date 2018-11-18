'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('subespecificas', 'especifica_id', {
      type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'especificas',
          key: 'id'
        },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return true;
  }
};