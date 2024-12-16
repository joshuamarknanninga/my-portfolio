// backend/routes/orderRoutes.js
const express = require('express');
const {
  createPaymentIntent,
  handleWebhook,
  getOrder,
} = require('../controllers/orderController');

const router = express.Router();
const bodyParser = require('body-parser');

// Route to create payment intent for an order
router.post('/create-payment-intent', createPaymentIntent);

// Route to handle Stripe webhooks
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  handleWebhook
);

// Route to get order details
router.route('/:id').get(getOrder);

module.exports = router;
