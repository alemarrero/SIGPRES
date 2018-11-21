'use strict';
module.exports = (sequelize, DataTypes) => {
  const productos = sequelize.define('productos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    codigo: {
      allowNull: false,
      type: DataTypes.REAL
    },    
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.REAL,
      allowNull: false
    },
    iva: {
      type: DataTypes.REAL,
      allowNull: false
    },
    monto_iva: {
      type: DataTypes.REAL,
      allowNull: false
    },  
    total: {
      type: DataTypes.REAL,
      allowNull: false
    },          
    unidad_de_medida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'unidades_de_medida',
        key: 'id'
      }
    },
    especifica_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'especificas',
        key: 'id'
      }
    },
    subespecifica_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subespecificas',
        key: 'id'
      }
    },        
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }    
  }, {
    timestamps: false,
    freezeTableName: true
  });
  productos.associate = function(models) {
    productos.hasOne(models.unidades_de_medida, {
      foreignKey: 'id',
      as: 'unidad_de_medida',
    });    
    productos.hasOne(models.especificas, {
      foreignKey: 'id',
      as: 'especifica',
    });    
    productos.hasOne(models.subespecificas, {
      foreignKey: 'id',
      as: 'subespecifica',
    }); 
  };
  return productos;
};