// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
      success: false,
      error: err.message || 'Server Error',
    });
  };
  
  module.exports = { errorHandler };
  