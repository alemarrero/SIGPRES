'use strict';
module.exports = (sequelize, DataTypes) => {
  const programas = sequelize.define('programas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    fecha_finalizacion: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    duracion: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    direccion_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    descripcion: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
  programas.associate = function(models) {
    // associations can be defined here
  };
  return programas;
};