// backend/controllers/donationController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../models/Donation');

// @desc    Create a Stripe Payment Intent
// @route   POST /api/donations/create-payment-intent
// @access  Public
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { name, email, amount } = req.body;

    // Validate input
    if (!name || !email || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: 'usd',
      metadata: { name, email },
    });

    // Save donation with status 'pending'
    const donation = new Donation({
      name,
      email,
      amount,
      paymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    await donation.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Handle Stripe webhook events
// @route   POST /api/donations/webhook
// @access  Public
exports.handleWebhook = async (req, res, next) => {
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
      // Update donation status to 'succeeded'
      await Donation.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: 'succeeded' }
      );
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      // Update donation status to 'failed'
      await Donation.findOneAndUpdate(
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
};
