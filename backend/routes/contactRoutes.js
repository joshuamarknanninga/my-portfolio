// backend/routes/contactRoutes.js
const express = require('express');
const { createContact } = require('../controllers/contactController');

const router = express.Router();

router.route('/').post(createContact);

module.exports = router;
