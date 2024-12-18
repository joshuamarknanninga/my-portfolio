// backend/routes/gptRoutes.js

const express = require('express');
const router = express.Router();
const {
  getGPTs,
  getGPTById,
  createGPT,
  updateGPT,
  deleteGPT,
} = require('../controllers/gptController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public Routes
router.route('/').get(getGPTs).post(protect, admin, createGPT);
router.route('/:id').get(getGPTById).put(protect, admin, updateGPT).delete(protect, admin, deleteGPT);

module.exports = router;
