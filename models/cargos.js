'use strict';
module.exports = (sequelize, DataTypes) => {
  const cargos = sequelize.define('cargos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    codigo: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },    
    cargo: {
      type: DataTypes.STRING,
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
  cargos.associate = function(models) {
 };
  return cargos;
};