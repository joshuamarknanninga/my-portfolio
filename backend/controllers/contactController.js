// backend/controllers/contactController.js
const Contact = require('../models/Contact');

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
};

// You can add admin routes to get contact messages
