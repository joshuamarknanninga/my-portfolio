// backend/models/gptModel.js

const mongoose = require('mongoose');

const gptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    externalUrl: { // New Field
      type: String,
      required: true,
    },
    // ... other fields as necessary
  },
  {
    timestamps: true,
  }
);

const GPT = mongoose.model('GPT', gptSchema);

module.exports = GPT;
