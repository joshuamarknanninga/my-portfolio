// backend/controllers/gptController.js

const asyncHandler = require('express-async-handler');
const GPT = require('../models/gptModel');

// @desc    Get all GPTs
// @route   GET /api/gpts
// @access  Public
const getGPTs = asyncHandler(async (req, res) => {
  const gpts = await GPT.find({});
  res.json(gpts);
});

// @desc    Get single GPT by ID
// @route   GET /api/gpts/:id
// @access  Public
const getGPTById = asyncHandler(async (req, res) => {
  const gpt = await GPT.findById(req.params.id);
  if (gpt) {
    res.json(gpt);
  } else {
    res.status(404);
    throw new Error('GPT not found');
  }
});

// @desc    Create a GPT
// @route   POST /api/gpts
// @access  Private/Admin
const createGPT = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, externalUrl } = req.body;

  const gpt = new GPT({
    name,
    description,
    imageUrl,
    externalUrl,
  });

  const createdGPT = await gpt.save();
  res.status(201).json(createdGPT);
});

// @desc    Update a GPT
// @route   PUT /api/gpts/:id
// @access  Private/Admin
const updateGPT = asyncHandler(async (req, res) => {
  const { name, description, imageUrl, externalUrl } = req.body;

  const gpt = await GPT.findById(req.params.id);

  if (gpt) {
    gpt.name = name || gpt.name;
    gpt.description = description || gpt.description;
    gpt.imageUrl = imageUrl || gpt.imageUrl;
    gpt.externalUrl = externalUrl || gpt.externalUrl;

    const updatedGPT = await gpt.save();
    res.json(updatedGPT);
  } else {
    res.status(404);
    throw new Error('GPT not found');
  }
});

// @desc    Delete a GPT
// @route   DELETE /api/gpts/:id
// @access  Private/Admin
const deleteGPT = asyncHandler(async (req, res) => {
  const gpt = await GPT.findById(req.params.id);

  if (gpt) {
    await gpt.remove();
    res.json({ message: 'GPT removed' });
  } else {
    res.status(404);
    throw new Error('GPT not found');
  }
});

module.exports = {
  getGPTs,
  getGPTById,
  createGPT,
  updateGPT,
  deleteGPT,
};
