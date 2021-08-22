const SuccessResponse = require('./success');
const ExcelResponse = require('./excel');
const ErrorResponse = require('./error');
const NoContentResponse = require('./noContent');
const WithMetaResponse = require('./withMeta');

/**
 * Custom responses
 *
 * res.success();
 * res.error();
 * res.noContent();
 * res.withMeta();
 */
module.exports = function () {
    return {
        success: SuccessResponse.bind(this),
        excel: ExcelResponse.bind(this),
        error: ErrorResponse.bind(this),
        noContent: NoContentResponse.bind(this),
        withMeta: WithMetaResponse.bind(this),
    }
};

// 'use strict';
// const fs = require('fs');
// let files = fs.readdirSync(`${__dirname}`, {encoding: 'utf8', withFileTypes: false});
// let exportJSON = files.reduce((acc, element) => {
//     let fileOrDirWithoutExtension = element.split('.')[0];
//     if (fileOrDirWithoutExtension !== "index" && fileOrDirWithoutExtension !== "")
//         return Object.assign(acc, {[fileOrDirWithoutExtension]: require(`./${fileOrDirWithoutExtension}`).bind(this)});
//     return acc;
// }, {});
// console.log(exportJSON);
// module.exports = function () {
//     return exportJSON;
// };
