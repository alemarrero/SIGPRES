'use strict';
module.exports = (sequelize, DataTypes) => {
  const unidades_de_medida = sequelize.define('unidades_de_medida', {
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
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  unidades_de_medida.associate = function(models) {
    // associations can be defined here
  };
  return unidades_de_medida;
};