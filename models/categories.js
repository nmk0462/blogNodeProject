'use strict';

const BaseModel = require("./BaseModel");

class Categories extends BaseModel {
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

            type:{
                type:DataTypes.STRING,
                allowNull:false,
                field: 'type',
                validate: {


                    isIn: {
                        args: [['main', 'sub']],
                        msg: "Must be main or sub"
                    }
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },

            image: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'image'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'description'
            },
            parent: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: 'parent'

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
            modelName: 'Categories',
            tableName: 'categories',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'modified_at'
        });
    };


    static associate(models) {
        this.getCategory = models.Categories.belongsTo(models.Categories, {
            foreignKey: 'parent',
            targetKey: 'id',
            as: 'categories'
        });this.addScope('defaultScope', {
            order: [['id', 'DESC']],
        }, {override: true});

    }
}




module.exports = Categories;