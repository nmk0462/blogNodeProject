'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('user', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'name'
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {isEmail: {msg: "Email Id is invalid."}},
                field: 'email'
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'password'
            },
            role: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'role'
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            },
            last_login_at: {
                type: Sequelize.DATE(3)
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

        await queryInterface.dropTable('user');
    }
};
