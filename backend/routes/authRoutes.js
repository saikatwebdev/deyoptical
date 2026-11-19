'use strict';

const express = require('express');
const router = express.Router();
const { login, verify } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { validateLogin } = require('../middleware/validate');

// POST /api/auth/login  — public
router.post('/login', validateLogin, login);

// POST /api/auth/verify — protected (ping to check token is still valid)
router.get('/verify', authMiddleware, verify);

module.exports = router;

