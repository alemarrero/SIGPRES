'use strict';
module.exports = (sequelize, DataTypes) => {
  const partidas_presupuestarias = sequelize.define('partidas_presupuestarias', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero_partida: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    denominacion: {
        type: DataTypes.STRING,
        allowNull: false
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
  partidas_presupuestarias.associate = function(models) {
    partidas_presupuestarias.hasMany(models.genericas, {
      foreignKey: 'partida_presupuestaria_id',
      as: 'genericas',
    })  };
  return partidas_presupuestarias;
};