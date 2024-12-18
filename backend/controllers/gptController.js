// backend/controllers/gptController.js

const GPT = require('../models/GPT');
const asyncHandler = require('express-async-handler');

// @desc    Get all GPTs
// @route   GET /api/gpts
// @access  Public
const getGPTs = asyncHandler(async (req, res) => {
  const gpts = await GPT.find().sort({ createdAt: -1 });
  res.json(gpts);
});

// @desc    Get single GPT
// @route   GET /api/gpts/:id
// @access  Public
const getGPT = asyncHandler(async (req, res) => {
  const gpt = await GPT.findById(req.params.id);

  if (!gpt) {
    res.status(404);
    throw new Error('GPT not found');
  }

  res.json(gpt);
});

// @desc    Create a new GPT
// @route   POST /api/gpts
// @access  Private/Admin
const createGPT = asyncHandler(async (req, res) => {
  const { title, description, imageUrl } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please provide title and description');
  }

  const gpt = new GPT({
    title,
    description,
    imageUrl: imageUrl || '',
  });

  const createdGPT = await gpt.save();
  res.status(201).json(createdGPT);
});

// @desc    Update a GPT
// @route   PUT /api/gpts/:id
// @access  Private/Admin
const updateGPT = asyncHandler(async (req, res) => {
  const { title, description, imageUrl } = req.body;

  const gpt = await GPT.findById(req.params.id);

  if (!gpt) {
    res.status(404);
    throw new Error('GPT not found');
  }

  gpt.title = title || gpt.title;
  gpt.description = description || gpt.description;
  gpt.imageUrl = imageUrl !== undefined ? imageUrl : gpt.imageUrl;

  const updatedGPT = await gpt.save();
  res.json(updatedGPT);
});

// @desc    Delete a GPT
// @route   DELETE /api/gpts/:id
// @access  Private/Admin
const deleteGPT = asyncHandler(async (req, res) => {
  const gpt = await GPT.findById(req.params.id);

  if (!gpt) {
    res.status(404);
    throw new Error('GPT not found');
  }

  await gpt.remove();
  res.json({ message: 'GPT removed' });
});

module.exports = {
  getGPTs,
  getGPT,
  createGPT,
  updateGPT,
  deleteGPT,
};
