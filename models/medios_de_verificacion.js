'use strict';
module.exports = (sequelize, DataTypes) => {
  const medios_de_verificacion = sequelize.define('medios_de_verificacion', {
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
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  medios_de_verificacion.associate = function(models) {
    // associations can be defined here
  };
  return medios_de_verificacion;
};