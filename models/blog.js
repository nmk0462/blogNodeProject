'use strict';

const BaseModel = require("./BaseModel");

class Blog extends BaseModel {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },

            main_image:{
                type:DataTypes.STRING,
                allowNull:true,
                field: 'main_image'
            },
            heading: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'heading'
            },

            large_description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'large_description'
            },
            small_description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'small_description'
            },
            created_by: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'created_by'
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            },

            created_at: {
                type: DataTypes.DATE(3),
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP(3)'),
            },
            modified_at: {
                type: DataTypes.DATE(3),
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP(3)'),
            }
        }, {
            sequelize: sequelize,
            modelName: 'Blog',
            tableName: 'blog',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'modified_at'
        });
    };


    static associate(models) {
        this.getCreatedBy = models.Blog.belongsTo(models.User, {
            foreignKey: 'created_by',
            targetKey: 'id',
            as: 'user'
        });this.addScope('defaultScope', {
            order: [['id', 'DESC']],
        }, {override: true});

    }
}





module.exports = Blog;