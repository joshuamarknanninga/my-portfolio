const Blog = require('../models/Blog'); // Ensure you have a Blog model
const asyncHandler = require('express-async-handler');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.json(blog);
});

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = new Blog({
    title,
    content,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  await blog.remove();
  res.json({ message: 'Blog removed' });
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
