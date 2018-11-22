'use strict';
module.exports = (sequelize, DataTypes) => {
  const entradas_solicitud_de_requerimientos = sequelize.define('entradas_solicitud_de_requerimientos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    solicitud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'solicitudes_de_requerimientos',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_primer_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_segundo_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_tercer_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_cuarto_trimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  entradas_solicitud_de_requerimientos.associate = function(models) {
    entradas_solicitud_de_requerimientos.belongsTo(models.solicitudes_de_requerimientos, {
      foreignKey: "solicitud_id",
      as: "solicitud_de_requerimiento",
      onDelete: 'CASCADE',
      hooks: true
    });
    entradas_solicitud_de_requerimientos.hasOne(models.productos, {
      foreignKey: 'id',
      as: 'producto',
    });

  };
  return entradas_solicitud_de_requerimientos;
};