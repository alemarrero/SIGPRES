'use strict';
module.exports = (sequelize, DataTypes) => {
  const especificas = sequelize.define('especificas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero_especifica: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    generica_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "genericas",
        key: "id"
      }
    },
    denominacion: {
        type: DataTypes.STRING,
        allowNull: false
      },   
    habilitada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  especificas.associate = function(models) {
    especificas.belongsTo(models.genericas, {
      foreignKey: 'generica_id',
      as: 'generica'
    });

    especificas.hasMany(models.subespecificas, {
      foreignKey: 'especifica_id',
      as: 'subespecificas',
    });

    especificas.hasMany(models.productos, {
      foreignKey: 'especifica_id',
      as: 'productos',
    });

  };
  return especificas;
};