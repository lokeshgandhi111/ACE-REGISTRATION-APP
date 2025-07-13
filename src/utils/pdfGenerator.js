const PDFDocument = require('pdfkit');

exports.generatePDF = (data) => {
  const doc = new PDFDocument();
  doc.fontSize(15).text('Registrations', { align: 'center' });
  doc.moveDown();
  data.forEach((entry, index) => {
    doc.text(`${index + 1}.`);
    Object.entries(entry).forEach(([key, value]) => {
      doc.text(`   ${key}: ${value}`);
    });
    doc.moveDown();
  });
  return doc;
};
