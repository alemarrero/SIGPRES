'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      precio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      unidad_de_medida_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'unidades_de_medida',
          key: 'id' 
        }
      },
      especifica_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'especificas',
          key: 'id' 
        }
      },   
      subespecifica_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subespecificas',
          key: 'id' 
        }
      },            
      habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }            
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productos');
  }
};