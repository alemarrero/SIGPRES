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
      unique: true,
      allowNull: false
    },    
    generica_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    })
    especificas.hasMany(models.subespecificas, {
      foreignKey: 'especifica_id',
      as: 'subespecificas',
    }) };
  return especificas;
};