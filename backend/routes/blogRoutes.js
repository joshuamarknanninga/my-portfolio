// backend/routes/blogRoutes.js
const express = require('express');
const { getBlogs, createBlog } = require('../controllers/blogController');

const router = express.Router();

router.route('/').get(getBlogs).post(createBlog);

module.exports = router;
