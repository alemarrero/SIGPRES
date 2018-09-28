'use strict';
module.exports = (sequelize, DataTypes) => {
  const bitacora = sequelize.define('bitacora', {
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  bitacora.associate = function(models) {
    bitacora.belongsTo(models.usuarios, {
      foreignKey: 'usuario_id',
    })
  };
  return bitacora;
};