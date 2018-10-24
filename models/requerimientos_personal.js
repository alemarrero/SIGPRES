'use strict';
module.exports = (sequelize, DataTypes) => {
  const requerimientos_personal = sequelize.define('requerimientos_personal', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },    
    numero_personas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },   
  }, {});
  requerimientos_personal.associate = function(models) {
    requerimientos_personal.belongsTo(models.solicitud_personal, {
      foreignKey: 'solicitud_personal_id',
      as: 'solicitud_personal',
      onDelete: 'CASCADE',
    });   
    requerimientos_personal.belongsTo(models.cargos, {
      foreignKey: 'cargo_id',
      as: 'cargo',
      onDelete: 'CASCADE',
    })  };    
  return requerimientos_personal;
};