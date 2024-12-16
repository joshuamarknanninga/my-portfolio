// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      enum: ['Picture', 'Story'],
      required: [true, 'Please specify the category'],
    },
    imageUrl: {
      type: String, // URL to the image if it's a picture
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    fileUrl: {
      type: String, // URL to the story file if it's a story
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
