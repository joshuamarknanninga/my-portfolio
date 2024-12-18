// backend/routes/blogRoutes.js
const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router.route('/:id').get(getBlog).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

module.exports = router;
