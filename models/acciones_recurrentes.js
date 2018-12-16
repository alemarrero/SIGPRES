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
    programacion_enero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_febrero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_marzo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_abril: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_mayo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_junio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_julio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_agosto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_septiembre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_octubre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_noviembre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    programacion_diciembre: {
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

    acciones_recurrentes.belongsTo(models.unidades_de_medida, {
      foreignKey: 'unidad_medida_id',
      as: 'unidad_de_medida',
    });

    acciones_recurrentes.belongsTo(models.medios_de_verificacion, {
      foreignKey: 'medio_verificacion_id',
      as: 'medio_de_verificacion',
    });
    acciones_recurrentes.hasMany(models.vinculacion_acciones_productos, {
      foreignKey: "accion_id",
      as: "vinculacion_acciones_productos"
    });       
  };
  return acciones_recurrentes;
};