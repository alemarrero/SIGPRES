'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('genericas', 'partida_presupuestaria_id', {
      type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'partidas_presupuestarias',
          key: 'id'
        },
    }, {
      timestamps: false
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('genericas', 'partida_presupuestaria_id', {
      allowNull: false,
      unique: true,           
      type: Sequelize.INTEGER      
    });
  }
};