'use strict';

const express = require('express');
const router = express.Router();
const { getAll, updateDoctor } = require('../controllers/doctorsController');
const authMiddleware = require('../middleware/auth');
const { validateDoctorUpdate } = require('../middleware/validate');

// GET /api/doctors         — public (visitors see doctor schedule)
router.get('/', getAll);

// PUT /api/doctors/:id     — admin only (update schedule/availability)
router.put('/:id', authMiddleware, validateDoctorUpdate, updateDoctor);

module.exports = router;

