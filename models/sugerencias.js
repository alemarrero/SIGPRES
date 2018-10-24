'use strict';
module.exports = (sequelize, DataTypes) => {
  const sugerencias = sequelize.define('sugerencias', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    identificador: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
   }, {});
  sugerencias.associate = function(models) {
    // associations can be defined here
  };
  return sugerencias;
};