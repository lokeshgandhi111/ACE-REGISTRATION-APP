const { google } = require('googleapis');
const keys = require('../google-service-key.json'); // your downloaded key
const SHEET_ID = '1SWIiD_0ogiSK_mgBpkdZvPfcKBcLUcJbRC8RNpbjQn4'; 

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

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
