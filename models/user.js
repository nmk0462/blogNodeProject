'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const {to} = require('../helpers/global_functions');
const ValidationError = require('../errors/ValidationError');
const BaseModel = require("./BaseModel");

class User extends BaseModel {
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

            name: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'name'
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {isEmail: {msg: "Email Id is invalid."}},
                field: 'email'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'password'
            },
            role: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'role'
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            },
            last_login_at: {
                type: DataTypes.DATE(3)
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
            modelName: 'User',
            tableName: 'user',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'modified_at'
        });
    };
    static hooks(models) {
        models.User.addHook('beforeSave', async (user) => {
            let err;
            if (user.changed('password')) {
                let salt, hash;
                [err, salt] = await to(bcrypt.genSalt(10));
                if (err) throw new ValidationError({}, err.message, true);

                [err, hash] = await to(bcrypt.hash(user.password, salt));
                if (err) throw new ValidationError({}, err.message, true);

                user.password = hash;
            }
        });
    }

    async comparePassword(pw) {
        let err, pass;
        if (!this.password) throw new ValidationError({}, 'password not set');
        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) throw new ValidationError({}, err);

        if (!pass) throw new ValidationError({"password": ["Invalid Password"]}, 'invalid password');

        return this;
    }

    async getJWT() {
        let expiration_time = parseInt(App.env.JWT_EXPIRATION);
        let payload = {
            id: this.id,
            employer: true,
            email: this.email,
            name: this.name,
            role:this.role,
            is_active:this.is_active
        };
        return "Bearer "+jwt.sign(payload, App.env.JWT_AUTH_SECRET, {expiresIn: expiration_time});
    }


}



module.exports = User;