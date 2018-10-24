'use strict';
module.exports = (sequelize, DataTypes) => {
  const cargos = sequelize.define('cargos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cargo: {
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
  cargos.associate = function(models) {
 };
  return cargos;
};