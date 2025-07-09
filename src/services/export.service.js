const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');
const { generatePDF } = require('../utils/pdfGenerator');

exports.toCSV = (data) => {
  const parser = new Parser();
  return parser.parse(data);
};

exports.toExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Registrations');
  if (data.length > 0) {
    sheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
    data.forEach(row => sheet.addRow(row));
  }
  return await workbook.xlsx.writeBuffer();
};

exports.toPDF = (data) => {
  return generatePDF(data);
};
