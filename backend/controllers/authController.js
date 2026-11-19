'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * POST /api/auth/login
 *
 * Body: { username, password }
 * Returns: { token, expiresIn }
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check username (case-insensitive for convenience)
    if (username.trim().toLowerCase() !== adminUsername.toLowerCase()) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Compare password — support both plain text (dev) and bcrypt hashes (prod)
    let passwordMatch = false;
    if (adminPassword.startsWith('$2')) {
      // Stored as bcrypt hash
      passwordMatch = await bcrypt.compare(password, adminPassword);
    } else {
      // Plain text comparison (dev mode — set a proper hash in production!)
      passwordMatch = password === adminPassword;
    }

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { username: adminUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
      username: adminUsername,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/verify
 * Validates a JWT token and returns its payload.
 * Protected by the auth middleware.
 */
const verify = (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { login, verify };

