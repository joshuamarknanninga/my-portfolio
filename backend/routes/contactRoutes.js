const express = require('express');
const { sendContact } = require('../controllers/contactController');

const router = express.Router();

// @route   POST /api/contact
// @desc    Send contact form data
// @access  Public
router.post('/', sendContact);

module.exports = router;
