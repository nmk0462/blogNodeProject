'use strict';

const BaseModel = require("./BaseModel");

class BlogCategories extends BaseModel {
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

            blog_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: 'blog_id'
            },
            category_id:{
                type: DataTypes.BIGINT,
                allowNull:false,
                field: 'category_id'
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
            modelName: 'BlogCategories',
            tableName: 'blog_categories',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'modified_at'
        });
    };


    static associate(models) {
        this.getCategoryId = models.BlogCategories.belongsTo(models.Categories, {
            foreignKey: 'category_id',
            targetKey: 'id',
            as: 'categories'
        });this.addScope('defaultScope', {
            order: [['id', 'DESC']],
        }, {override: true});

        this.getBlog = models.BlogCategories.belongsTo(models.Blog, {
            foreignKey: 'blog_id',
            targetKey: 'id',
            as: 'user'
        });this.addScope('defaultScope', {
            order: [['id', 'DESC']],
        }, {override: true});

    }
}





module.exports = BlogCategories;