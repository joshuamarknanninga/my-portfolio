// backend/controllers/orderController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// @desc    Create a Stripe Payment Intent for an Order
// @route   POST /api/orders/create-payment-intent
// @access  Public
exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const { customerName, customerEmail, products } = req.body;

  if (!customerName || !customerEmail || !products || products.length === 0) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  // Calculate total amount
  let totalAmount = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.productId}`);
    }
    totalAmount += product.price * (item.quantity || 1);
  }

  // Create Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100), // Amount in cents
    currency: 'usd',
    metadata: { customerName, customerEmail },
  });

  // Create Order with status 'pending'
  const order = new Order({
    customerName,
    customerEmail,
    products,
    totalAmount,
    paymentIntentId: paymentIntent.id,
    status: 'pending',
  });

  await order.save();

  res.send({
    clientSecret: paymentIntent.client_secret,
    orderId: order._id,
  });
});

// @desc    Handle Stripe webhook events for Orders
// @route   POST /api/orders/webhook
// @access  Public
exports.handleWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update order status to 'succeeded'
      await Order.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: 'succeeded' }
      );
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      // Update order status to 'failed'
      await Order.findOneAndUpdate(
        { paymentIntentId: failedIntent.id },
        { status: 'failed' }
      );
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

// @desc    Get Order by ID
// @route   GET /api/orders/:id
// @access  Public
exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products.productId');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(order);
});
