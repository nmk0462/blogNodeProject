module.exports = function (workbook, filename = "export.xlsx", statusCode = 200) {

    // Get access to `req` and `res`
    const req = this.req;
    const res = this.res;

    this.res.writeHead(statusCode, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=' + filename
    });

    return workbook.xlsx.write(this.res).then(function () {
        return res.end();
    });
};