'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('especificas', 'generica_id', {
      type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'genericas',
          key: 'id'
        },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('especificas', 'generica_id', {
      allowNull: false,
      unique: true,           
      type: Sequelize.INTEGER      
    });
  }
};