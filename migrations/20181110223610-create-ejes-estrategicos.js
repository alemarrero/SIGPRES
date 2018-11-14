'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ejes_estrategicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      antecedente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'antecedentes',
          key: 'id'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ejes_estrategicos');
  }
};