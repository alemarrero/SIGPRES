'use strict';
module.exports = (sequelize, DataTypes) => {
  const propuestas_plan_operativo_anual = sequelize.define('propuestas_plan_operativo_anual', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'areas',
        key: 'id'
      }
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enviada: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    aprobada: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  propuestas_plan_operativo_anual.associate = function(models) {
    propuestas_plan_operativo_anual.hasMany(models.objetivos_especificos, {
      foreignKey: 'propuesta_id',
      as: 'objetivos_especificos' 
    });

    propuestas_plan_operativo_anual.belongsTo(models.areas, {
      foreignKey: 'area_id',
      as: 'area'
    });    
  };
  return propuestas_plan_operativo_anual;
};