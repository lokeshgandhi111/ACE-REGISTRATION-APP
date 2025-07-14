const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SHEET_ID = process.env.SHEET_ID;

// ✅ Append a single row to the sheet
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

// ✅ Get all data from the sheet
exports.getGoogleSheetData = async () => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A2:G', // Skip headers if they exist
  });

  const rows = response.data.values || [];

  return rows.map(row => ({
    timestamp: row[0],
    fullName: row[1],
    email: row[2],
    phone: row[3],
    department: row[4],
    year: row[5],
    branch: row[6],
  }));
};
