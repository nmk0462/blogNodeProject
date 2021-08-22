'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('blog', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },
            main_image:{
                type:Sequelize.STRING,
                allowNull:true,
                field: 'main_image'
            },
            heading: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'heading'
            },

            large_description: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'large_description'
            },
            small_description: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'small_description'
            },
            created_by: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                },
                field: 'created_by',

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

        await queryInterface.dropTable('blog');
    }
};
