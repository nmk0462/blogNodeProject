const excel = require('exceljs');

function generate_excel_data(sheetNames, headers, data) {
    let workbook = new excel.Workbook();
    for (let i = 0; i < headers.length; i++) {
        let worksheet = workbook.addWorksheet(sheetNames[i]);
        worksheet.columns = headers[i];
        worksheet.addRows(data[i]);
    }
    return workbook;
}

module.exports = {
    generate_excel_data
};