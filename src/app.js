const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const registrationRoutes = require('./routes/registration.routes');

const app = express();

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Serve home.html at root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/', registrationRoutes);

module.exports = app;
