'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('blog_categories', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },
            blog_id:{
                type:Sequelize.BIGINT,
                allowNull:false,
                field: 'blog_id',
                references: {
                    model: 'blog',
                    key: 'id'
                },
            },
            category_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                field: 'category_id',
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

        await queryInterface.dropTable('blog_categories');
    }
};
