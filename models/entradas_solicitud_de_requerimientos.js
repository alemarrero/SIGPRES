'use strict';
module.exports = (sequelize, DataTypes) => {
  const entradas_solicitud_de_requerimientos = sequelize.define('entradas_solicitud_de_requerimientos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    cantidad_enero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_febrero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_marzo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_abril: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_mayo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_junio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_julio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_agosto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    cantidad_septiembre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_octubre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_noviembre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_diciembre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },     
    solicitud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'solicitudes_de_requerimientos',
        key: 'id'
      }
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
  entradas_solicitud_de_requerimientos.associate = function(models) {
    entradas_solicitud_de_requerimientos.belongsTo(models.solicitudes_de_requerimientos, {
      foreignKey: "solicitud_id",
      as: "solicitud_de_requerimiento",
    });
    entradas_solicitud_de_requerimientos.hasOne(models.productos, {
      foreignKey: 'id',
      as: 'producto',
    });

  };
  return entradas_solicitud_de_requerimientos;
};