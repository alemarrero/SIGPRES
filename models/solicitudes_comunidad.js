'use strict';
module.exports = (sequelize, DataTypes) => {
  const solicitudes_comunidad = sequelize.define('solicitudes_comunidad', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    parroquia: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sector: {
      allowNull: false,
      type: DataTypes.STRING
    },
    organizacion: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefono: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    vision_comunidad: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nombre_propuesta: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ubicacion_propuesta: {
      allowNull: false,
      type: DataTypes.STRING
    },
    descripcion_propuesta: {
      allowNull: false,
      type: DataTypes.STRING
    },
    beneficiarios_directos: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    beneficiarios_indirectos: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    presentada_anteriormente: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    año_presentacion: {
      type: DataTypes.STRING
    },
    solicito_recursos_anteriormente: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    solicito_recursos_a: {
      type: DataTypes.STRING
    },
    nombre_responsable: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefono_responsable: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email_responsable: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fichero: {
      type: DataTypes.STRING
    },
    enlace: {
      type: DataTypes.STRING
    },
    identificador: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comentarios: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  solicitudes_comunidad.associate = function(models) {
    // associations can be defined here
  };
  return solicitudes_comunidad;
};