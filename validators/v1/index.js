'use strict';
const fs = require('fs');
let files = fs.readdirSync(`${__dirname}`, {encoding: 'utf8', withFileTypes: false});
let exportJSON = files.reduce((acc, element) => {
    let fileOrDirWithoutExtension = element.split('.')[0];
    if (fileOrDirWithoutExtension !== "index" && fileOrDirWithoutExtension !== "")
        return Object.assign(acc, {[fileOrDirWithoutExtension]: require(`./${fileOrDirWithoutExtension}`)});
    return acc;
}, {});
module.exports = exportJSON;