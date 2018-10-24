'use strict';
module.exports = (sequelize, DataTypes) => {
  const areas = sequelize.define('areas', {
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
    descripcion: {
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
  areas.associate = function(models) {
    areas.hasMany(models.solicitud_personal, {
      foreignKey: 'area_id',
      as: 'solicitud_personal',
    })
    };
  return areas;
};