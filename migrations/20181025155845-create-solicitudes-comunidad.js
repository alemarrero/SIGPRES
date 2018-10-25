'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitudes_comunidad', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parroquia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sector: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organizacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefono: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      vision_comunidad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre_propuesta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ubicacion_propuesta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descripcion_propuesta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      beneficiarios_directos: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      beneficiarios_indirectos: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      presentada_anteriormente: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      año_presentacion: {
        type: Sequelize.STRING
      },
      solicito_recursos_anteriormente: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      solicito_recursos_a: {
        type: Sequelize.STRING
      },
      nombre_responsable: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefono_responsable: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_responsable: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fichero: {
        type: Sequelize.STRING
      },
      enlace: {
        type: Sequelize.STRING
      },
      identificador: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comentarios: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('solicitudes_comunidad');
  }
};