// backend/controllers/blogController.js
const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private (if authentication is implemented)
exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const blog = new Blog({ title, content, author });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

// Add more CRUD operations as needed
