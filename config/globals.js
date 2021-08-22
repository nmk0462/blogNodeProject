const lodash = require('lodash');
const Helper = require('../helpers/helpers');
const Chalk = require('chalk');
const moment = require('moment');
const path = require('path');
require('dotenv').config();
const env = process.env || {};
const sequelize = require('sequelize');
const aws = require('aws-sdk');
const config = {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_BUCKET_REGION,
};
aws.config.update(config);
const S3Bucket = new aws.S3({
    signatureVersion: 'v4',
    params: {Bucket: env.AWS_BUCKET_NAME},
});
module.exports = {

    lodash: lodash,

    helpers: Helper,

    chalk: Chalk,

    moment: moment.tz.setDefault("Asia/Kolkata"),

    env: env,

    sequelize: sequelize,

    aws:aws,

    S3Bucket:S3Bucket,

    paths: {
        root: path.resolve(__dirname, '../')
    },

};
