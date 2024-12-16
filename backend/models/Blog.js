// backend/models/Blog.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    author: {
      type: String,
      required: true,
      default: 'Your Name',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
