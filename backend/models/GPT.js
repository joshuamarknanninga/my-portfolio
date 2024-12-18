// backend/models/GPT.js

const mongoose = require('mongoose');

const gptSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const GPT = mongoose.model('GPT', gptSchema);

module.exports = GPT;
