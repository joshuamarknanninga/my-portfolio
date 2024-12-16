// backend/models/GPT.js
const mongoose = require('mongoose');

const GPTSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name for the GPT'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    // Add more fields like image, link, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model('GPT', GPTSchema);
