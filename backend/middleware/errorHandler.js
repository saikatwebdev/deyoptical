'use strict';

/**
 * Centralized error handler middleware.
 * Must be registered LAST in the Express middleware chain.
 */
const errorHandler = (err, req, res, _next) => {
  console.error(`[Error] ${req.method} ${req.url}:`, err.message || err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join('; ') });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {}).join(', ');
    return res.status(409).json({
      success: false,
      message: `Duplicate value for field: ${field}`,
    });
  }

  // JWT errors (should be caught by middleware but just in case)
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }

  // Default 500
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error.' : err.message,
  });
};

module.exports = errorHandler;

