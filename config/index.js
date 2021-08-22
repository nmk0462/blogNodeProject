require('dotenv').config();

const settings = require('./settings');
const models = require('./models');
const messages = require('./messages');

CONFIG = {};

CONFIG.port = process.env.PORT || '3000';

module.exports = {
    settings,
    models,
    messages,
    CONFIG,
};