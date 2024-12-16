// backend/models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add donation amount'],
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      default: 'pending',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', DonationSchema);
