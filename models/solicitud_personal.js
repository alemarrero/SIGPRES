'use strict';
module.exports = (sequelize, DataTypes) => {
  const solicitud_personal = sequelize.define('solicitud_personal', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    justificacion: {
      type: DataTypes.STRING,
          allowNull: false
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    enviada: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },   
  }, {
    timestamps: false,
    freezeTableName: true
  });
  solicitud_personal.associate = function(models) {
    solicitud_personal.belongsTo(models.areas, {
      foreignKey: 'area_id',
      as: 'area',
      onDelete: 'CASCADE',
    }); 
    solicitud_personal.hasMany(models.requerimientos_personal, {
      foreignKey: 'solicitud_personal_id',
      as: 'requerimientos_personal',
    })  };    
  return solicitud_personal;
};