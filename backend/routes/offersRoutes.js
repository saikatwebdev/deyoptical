'use strict';

const express = require('express');
const router = express.Router();
const { getAll, create, update, toggleActive, remove } = require('../controllers/offersController');
const authMiddleware = require('../middleware/auth');
const { validateOffer } = require('../middleware/validate');

// GET  /api/offers          — public (visitors read offers)
router.get('/', getAll);

// POST /api/offers          — admin only
router.post('/', authMiddleware, validateOffer, create);

// PUT  /api/offers/:id      — admin only
router.put('/:id', authMiddleware, validateOffer, update);

// PATCH /api/offers/:id/toggle — admin only
router.patch('/:id/toggle', authMiddleware, toggleActive);

// DELETE /api/offers/:id   — admin only
router.delete('/:id', authMiddleware, remove);

module.exports = router;

