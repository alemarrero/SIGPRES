'use strict';
module.exports = (sequelize, DataTypes) => {
  const antecedentes = sequelize.define('antecedentes', {
    id:  {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    periodo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    mision: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vision: {
      type: DataTypes.STRING,
      allowNull: false
    },
    debilidades: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fortalezas: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amenazas: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oportunidades: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  antecedentes.associate = function(models) {
    antecedentes.hasMany(models.ejes_estrategicos, {
      foreignKey: 'antecedente_id',
      as: 'ejes_estrategicos',
    });
  };
  return antecedentes;
};