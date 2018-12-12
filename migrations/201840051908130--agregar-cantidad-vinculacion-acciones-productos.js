module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_enero', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_febrero', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_marzo', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_abril', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_mayo', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_junio', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_julio', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_agosto', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_septiembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_octubre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_noviembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad_diciembre', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t }),
                queryInterface.addColumn('vinculacion_acciones_productos', 'cantidad', {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }, { transaction: t })                
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_enero', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_febrero', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_marzo', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_abril', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_mayo', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_junio', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_julio', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_agosto', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_septiembre', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_octubre', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_noviembre', { transaction: t }),
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad_diciembre', { transaction: t }),            
                queryInterface.removeColumn('vinculacion_acciones_productos', 'cantidad', { transaction: t })           
            ])
        })
    }
};
