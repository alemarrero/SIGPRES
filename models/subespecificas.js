'use strict';
module.exports = (sequelize, DataTypes) => {
  const subespecificas = sequelize.define('subespecificas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numero_subespecifica: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    especifica_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "especificas",
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
  subespecificas.associate = function(models) {
    subespecificas.belongsTo(models.especificas, {
      foreignKey: 'especifica_id',
      as: 'especifica'
    });
    
    subespecificas.hasMany(models.productos, {
      foreignKey: 'subespecifica_id',
      as: 'productos',
    });
  };
  return subespecificas;
};