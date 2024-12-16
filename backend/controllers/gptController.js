// backend/controllers/gptController.js
const GPT = require('../models/GPT');

// @desc    Get all GPTs
// @route   GET /api/gpts
// @access  Public
exports.getGPTs = async (req, res, next) => {
  try {
    const gpts = await GPT.find();
    res.json(gpts);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a GPT
// @route   POST /api/gpts
// @access  Private (if authentication is implemented)
exports.createGPT = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const gpt = new GPT({ name, description });
    const savedGPT = await gpt.save();
    res.status(201).json(savedGPT);
  } catch (error) {
    next(error);
  }
};

// Add more CRUD operations as needed
