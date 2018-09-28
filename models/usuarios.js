'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define('usuarios', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false
    },      
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    departamento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'basico'
    },
    habilitado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  usuarios.associate = function(models) {
    usuarios.hasMany(models.bitacora, {
      foreignKey: 'usuario_id',
      as: 'registros_bitacora',
    })
  };
  return usuarios;
};