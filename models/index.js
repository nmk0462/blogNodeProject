const Sequelize = require("sequelize");
require('dotenv').config();
const env = process.env || {};

const UserModel = require('./user');
const CategoryModel = require('./categories');
const BlogModel = require('./blog');
const BlogCategoryModel = require('./blog_categories');



const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_CONNECTION,
    timezone: "+05:30", // timezone for writing to the db
    dialectOptions: {
        dateStrings: true, // disable mysql conversion
        typeCast: true // Overwrite the sequelize conversion, look at the code, currently only affects date and GEOMETRY, can be used
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const db = {
    User: UserModel.init(sequelize, Sequelize),
    Categories: CategoryModel.init(sequelize,Sequelize),
    Blog: BlogModel.init(sequelize,Sequelize),
    BlogCategories: BlogCategoryModel.init(sequelize,Sequelize)

};
// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(db)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(db));

Object.values(db)
    .filter(model => typeof model.hooks === "function")
    .forEach(model => model.hooks(db));


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;