'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_primer_trimestre', 'programacion_enero', { transaction: t }),
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_segundo_trimestre', 'programacion_febrero', { transaction: t }),
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_tercer_trimestre', 'programacion_marzo', { transaction: t }),
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_cuarto_trimestre', 'programacion_abril', { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_mayo', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_junio', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_julio', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_agosto', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_septiembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_octubre', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_noviembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t }),
                queryInterface.addColumn('acciones_recurrentes', 'programacion_diciembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }, { transaction: t })
            ])
        })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_enero', 'programacion_primer_trimestre',  { transaction: t }),
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_febrero', 'programacion_segundo_trimestre',  { transaction: t }),
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_marzo', 'programacion_tercer_trimestre',  { transaction: t }),
                queryInterface.renameColumn('acciones_recurrentes', 'programacion_abril', 'programacion_cuarto_trimestre',  { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_mayo', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_junio', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_julio', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_agosto', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_septiembre', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_octubre', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_noviembre', { transaction: t }),
                queryInterface.removeColumn('acciones_recurrentes', 'programacion_diciembre', { transaction: t }),            
            ])
        })
  }
};
