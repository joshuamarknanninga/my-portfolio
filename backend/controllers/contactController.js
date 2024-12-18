const asyncHandler = require('express-async-handler');

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const sendContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Implement email sending or database storage here
  // For demonstration, we'll just return the data

  res.status(201).json({
    success: true,
    data: {
      name,
      email,
      message,
    },
  });
});

module.exports = { sendContact };
