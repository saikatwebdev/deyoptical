'use strict';

const express = require('express');
const router = express.Router();
const { getAll, create, update, remove, reset } = require('../controllers/galleryController');
const authMiddleware = require('../middleware/auth');

// GET  /api/gallery        — public (visitors view public gallery)
router.get('/', getAll);

// POST /api/gallery        — admin only (upload photo or batch of photos)
router.post('/', authMiddleware, create);

// PUT  /api/gallery/:id    — admin only (update photo tag/details)
router.put('/:id', authMiddleware, update);

// DELETE /api/gallery/:id  — admin only (delete photo)
router.delete('/:id', authMiddleware, remove);

// POST /api/gallery/reset  — admin only (restore default gallery photos)
router.post('/reset', authMiddleware, reset);

module.exports = router;

