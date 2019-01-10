'use strict';
module.exports = (sequelize, DataTypes) => {
  const objetivos_especificos = sequelize.define('objetivos_especificos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero_actividad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    objetivo: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    propuesta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'propuestas_plan_operativo_anual',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  objetivos_especificos.associate = function(models) {
    objetivos_especificos.hasMany(models.acciones_recurrentes, {
      foreignKey: 'objetivo_especifico_id',
      as: 'acciones_recurrentes',
    });

    objetivos_especificos.belongsTo(models.propuestas_plan_operativo_anual, {
      foreignKey: 'propuesta_id',
      as: 'propuesta',
    });
  };
  return objetivos_especificos;
};