const express = require('express');
const { getGPTs, getGPT, createGPT, updateGPT, deleteGPT } = require('../controllers/gptController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getGPTs).post(protect, admin, createGPT);
router.route('/:id').get(getGPT).put(protect, admin, updateGPT).delete(protect, admin, deleteGPT);

module.exports = router;
