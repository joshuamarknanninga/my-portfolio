// backend/routes/donationRoutes.js
const express = require('express');
const {
  createPaymentIntent,
  handleWebhook,
} = require('../controllers/donationController');

const router = express.Router();

// Middleware to parse raw body for webhook
const bodyParser = require('body-parser');

// Route to create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Route to handle webhooks
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  handleWebhook
);

module.exports = router;
