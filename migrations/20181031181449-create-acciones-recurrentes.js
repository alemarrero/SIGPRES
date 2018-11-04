'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('acciones_recurrentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      objetivo_especifico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'objetivos_especificos',
          key: 'id'
        }
      },
      accion_recurrente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unidad_medida_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'unidades_de_medida',
          key: 'id'
        }
      },
      meta_fisica_anual: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      programacion_primer_trimestre: {
        type: Sequelize.INTEGER
      },
      programacion_segundo_trimestre: {
        type: Sequelize.INTEGER
      },
      programacion_tercer_trimestre: {
        type: Sequelize.INTEGER
      },
      programacion_cuarto_trimestre: {
        type: Sequelize.INTEGER
      },
      medio_verificacion_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medios_de_verificacion',
          key: 'id'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('acciones_recurrentes');
  }
};