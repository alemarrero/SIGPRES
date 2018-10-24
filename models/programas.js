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
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_finalizacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
  programas.associate = function(models) {
    programas.belongsTo(models.areas, {
      foreignKey: 'area_id',
      as: 'area',
      onDelete: 'CASCADE',
    });
  };
  return programas;
};