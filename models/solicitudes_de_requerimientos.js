'use strict';
module.exports = (sequelize, DataTypes) => {
  const solicitudes_de_requerimientos = sequelize.define('solicitudes_de_requerimientos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'areas',
        key: 'id'
      }
    },
    enviada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
  solicitudes_de_requerimientos.associate = function(models) {
    solicitudes_de_requerimientos.hasMany(models.entradas_solicitud_de_requerimientos, {
      foreignKey: 'solicitud_id',
      as: 'requerimientos',
      onDelete: 'cascade',
      hooks: true
    });

    solicitudes_de_requerimientos.belongsTo(models.areas, {
      foreignKey: 'area_id',
      as: 'area',
    });
  };
  return solicitudes_de_requerimientos;
};