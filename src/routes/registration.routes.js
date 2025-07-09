const express = require('express');
const router = express.Router();
const controller = require('../controllers/registration.controller');



// Client-facing
router.post('/register', controller.registerUser);

// Admin-only (secured with key)
router.get('/admin/download', controller.adminDownloadData);

module.exports = router;
