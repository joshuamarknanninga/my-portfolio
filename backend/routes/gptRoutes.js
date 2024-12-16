// backend/routes/gptRoutes.js
const express = require('express');
const { getGPTs, createGPT } = require('../controllers/gptController');

const router = express.Router();

router.route('/').get(getGPTs).post(createGPT);

module.exports = router;
