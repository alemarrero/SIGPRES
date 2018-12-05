module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_enero', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_febrero', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_marzo', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_abril', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_mayo', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_junio', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_julio', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_agosto', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_septiembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_octubre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_noviembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_diciembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_primer_trimestre', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_segundo_trimestre', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_tercer_trimestre', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_cuarto_trimestre', { transaction: t }),                                                                
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_enero', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_febrero', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_marzo', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_abril', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_mayo', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_junio', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_julio', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_agosto', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_septiembre', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_octubre', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_noviembre', { transaction: t }),
                queryInterface.removeColumn('entradas_solicitud_de_requerimientos', 'cantidad_diciembre', { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_primer_trimestre', {
                    type: Sequelize.INTEGER,
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_segundo_trimestre', {
                    type: Sequelize.INTEGER,
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_tercer_trimestre', {
                    type: Sequelize.INTEGER,
                }, { transaction: t }),
                queryInterface.addColumn('entradas_solicitud_de_requerimientos', 'cantidad_cuarto_trimestre', {
                    type: Sequelize.INTEGER,
                }, { transaction: t }),                                                
            ])
        })
    }
};
