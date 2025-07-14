const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load the credentials from your key file
const KEY_PATH = path.join(__dirname, '../../google-service-key.json');
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});


const SHEET_ID = process.env.SHEET_ID;
exports.appendToGoogleSheet = async (data) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.department || '',
    data.year || '',
    data.branch || ''
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [row] }
  });
};
