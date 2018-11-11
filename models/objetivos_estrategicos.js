'use strict';
module.exports = (sequelize, DataTypes) => {
  const objetivos_estrategicos = sequelize.define('objetivos_estrategicos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    objetivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eje_estrategico_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'objetivos_estrategicos',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
  objetivos_estrategicos.associate = function(models) {
    objetivos_estrategicos.belongsTo(models.ejes_estrategicos, {
      foreignKey: "eje_estrategico_id",
      as: "eje_estrategico"
    });
  };
  return objetivos_estrategicos;
};