'use strict';
module.exports = (sequelize, DataTypes) => {
  const vinculacion_acciones_productos = sequelize.define('vinculacion_acciones_productos', {
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
    accion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'acciones_recurrentes',
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
   }, {
    timestamps: false,
    freezeTableName: true
  });
  
  vinculacion_acciones_productos.associate = function(models) {
    vinculacion_acciones_productos.belongsTo(models.productos, {
      foreignKey: 'producto_id',
      as: 'productos'
    });
    vinculacion_acciones_productos.belongsTo(models.acciones_recurrentes, {
      foreignKey: 'accion_id',
      as: 'acciones_recurrentes',
    });
  };
  return vinculacion_acciones_productos;
};