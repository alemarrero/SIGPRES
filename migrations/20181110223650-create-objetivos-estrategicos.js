'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('objetivos_estrategicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objetivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eje_estrategico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ejes_estrategicos',
          key: 'id'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('objetivos_estrategicos');
  }
};