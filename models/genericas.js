'use strict';
module.exports = (sequelize, DataTypes) => {
  const genericas = sequelize.define('genericas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero_generica: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },    
    partida_presupuestaria_id: {
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
  genericas.associate = function(models) {
    genericas.belongsTo(models.partidas_presupuestarias, {
      foreignKey: 'partida_presupuestaria_id',
    })  };
  return genericas;
};