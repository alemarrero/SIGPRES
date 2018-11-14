'use strict';
module.exports = (sequelize, DataTypes) => {
  const ejes_estrategicos = sequelize.define('ejes_estrategicos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    antecedente_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'antecedentes',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  ejes_estrategicos.associate = function(models) {
    ejes_estrategicos.belongsTo(models.antecedentes, {
      foreignKey: "antecedente_id",
      as: "antecedente"
    });

    ejes_estrategicos.hasMany(models.objetivos_estrategicos, {
      foreignKey: "eje_estrategico_id",
      as: "objetivos_estrategicos"
    });
  };
  return ejes_estrategicos;
};