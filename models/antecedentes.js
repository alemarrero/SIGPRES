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
    oportunidades_fortalezas: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    oportunidades_debilidades: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    amenazas_fortalezas: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    amenazas_debilidades: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    objetivo_general: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    mision: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    vision: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    debilidades: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    fortalezas: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    amenazas: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    oportunidades: {
      type: DataTypes.STRING(2000),
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