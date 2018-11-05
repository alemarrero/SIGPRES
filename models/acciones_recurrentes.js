'use strict';
module.exports = (sequelize, DataTypes) => {
  const acciones_recurrentes = sequelize.define('acciones_recurrentes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    objetivo_especifico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'objetivos_especificos',
        key: 'id'
      }
    },
    accion_recurrente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unidad_medida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'unidades_de_medida',
        key: 'id'
      }
    },
    meta_fisica_anual: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_primer_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_segundo_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_tercer_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_cuarto_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medio_verificacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medios_de_verificacion',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  acciones_recurrentes.associate = function(models) {
    acciones_recurrentes.belongsTo(models.objetivos_especificos, {
      foreignKey: 'objetivo_especifico_id',
      as: 'objetivo_especifico',
    });

    acciones_recurrentes.hasOne(models.unidades_de_medida, {
      foreignKey: 'id',
      as: 'unidad_de_medida',
    });

    acciones_recurrentes.hasOne(models.medios_de_verificacion, {
      foreignKey: 'id',
      as: 'medio_de_verificacion',
    });
  };
  return acciones_recurrentes;
};