'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entradas_solicitud_de_requerimientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      solicitud_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "solicitudes_de_requerimientos",
          key: "id"
        }
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "productos",
          key: "id"
        }
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      cantidad_primer_trimestre: {
        type: Sequelize.INTEGER
      },
      cantidad_segundo_trimestre: {
        type: Sequelize.INTEGER
      },
      cantidad_tercer_trimestre: {
        type: Sequelize.INTEGER
      },
      cantidad_cuarto_trimestre: {
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('entradas_solicitud_de_requerimientos');
  }
};