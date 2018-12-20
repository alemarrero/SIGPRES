'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('antecedentes', 'oportunidades_fortalezas', {
                    type: Sequelize.STRING(2000),
                    allowNull: false,
                    defaultValue: "oportunidades_fortalezas"
                }, { transaction: t }),
                queryInterface.addColumn('antecedentes', 'oportunidades_debilidades', {
                    type: Sequelize.STRING(2000),
                    allowNull: false,
                    defaultValue: "oportunidades_debilidades"
                }, { transaction: t }),
                queryInterface.addColumn('antecedentes', 'amenazas_fortalezas', {
                    type: Sequelize.STRING(2000),
                    allowNull: false,
                    defaultValue: "amenazas_fortalezas"
                }, { transaction: t }),
                queryInterface.addColumn('antecedentes', 'amenazas_debilidades', {
                    type: Sequelize.STRING(2000),
                    allowNull: false,
                    defaultValue: "amenazas_debilidades"
                }, { transaction: t })
            ])
        })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('antecedentes', 'oportunidades_fortalezas', { transaction: t }),
                queryInterface.removeColumn('antecedentes', 'oportunidades_debilidades', { transaction: t }),
                queryInterface.removeColumn('antecedentes', 'amenazas_fortalezas', { transaction: t }),
                queryInterface.removeColumn('antecedentes', 'amenazas_debilidades', { transaction: t }),
            ])
        })
  }
};
