const registrationService = require('../services/registration.service');
const exportService = require('../services/export.service');
const { appendToGoogleSheet } = require('../utils/google-sheets');

exports.registerUser = async (req, res) => {
  const userData = req.body;

  try {
    await appendToGoogleSheet(userData);
    res.status(200).json({ message: 'Saved to Google Sheet!' });
  } catch (error) {
    console.error('❌ Failed to write to sheet:', error);
    res.status(500).json({ error: 'Failed to save to Google Sheet' });
  }
};



exports.downloadData = async (req, res) => {
  const format = req.query.format || 'csv';
  const data = registrationService.getAll();

  try {
    if (format === 'csv') {
      const csv = exportService.toCSV(data);
      res.attachment('registrations.csv');
      res.send(csv);
    } else if (format === 'excel') {
      const buffer = await exportService.toExcel(data);
      res.attachment('registrations.xlsx');
      res.send(buffer);
    } else if (format === 'pdf') {
      const doc = exportService.toPDF(data);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=registrations.pdf');
      doc.pipe(res);
      doc.end();
    } else {
      res.status(400).send('Invalid format requested.');
    }
  } catch (err) {
    res.status(500).json({ error: 'Export failed', details: err.message });
  }
};

exports.adminDownloadData = async (req, res) => {
  const format = req.query.format || 'csv';
  const adminKey = req.query.key;

  if (adminKey !== 'admin123') {
    return res.status(403).send('Access denied: Invalid admin key');
  }

  const data = registrationService.getAll();

  try {
    if (format === 'csv') {
      const csv = exportService.toCSV(data);
      res.attachment('registrations.csv');
      res.send(csv);
    } else if (format === 'excel') {
      const buffer = await exportService.toExcel(data);
      res.attachment('registrations.xlsx');
      res.send(buffer);
    } else if (format === 'pdf') {
      const doc = exportService.toPDF(data);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=registrations.pdf');
      doc.pipe(res);
      doc.end();
    } else {
      res.status(400).send('Invalid format requested.');
    }
  } catch (err) {
    res.status(500).json({ error: 'Export failed', details: err.message });
  }
};
