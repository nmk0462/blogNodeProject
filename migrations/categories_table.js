'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('categories', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },
            type:{
                type:Sequelize.STRING,
                allowNull:false,
                field: 'type'
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'name'
            },

            image: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'image'
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'description'
            },
            parent: {
                type: Sequelize.BIGINT,
                allowNull: true,
                field: 'parent',
                references: {
                    model: 'categories',
                    key: 'id'
                },
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            },

            created_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            modified_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            }
        });
    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.dropTable('categories');
    }
};
