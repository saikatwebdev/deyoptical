'use strict';

const { body, validationResult } = require('express-validator');

/** Run validations and short-circuit with 400 if any fail */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((e) => e.msg).join('; '),
    });
  }
  next();
};

// ── Auth validators ───────────────────────────────────────────────────────────
const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required.'),
  body('password').trim().notEmpty().withMessage('Password is required.'),
  handleValidation,
];

// ── Offer validators ──────────────────────────────────────────────────────────
const validateOffer = [
  body('title').trim().notEmpty().withMessage('Offer title is required.')
    .isLength({ max: 200 }).withMessage('Title must be 200 chars or fewer.'),
  body('description').trim().notEmpty().withMessage('Offer description is required.')
    .isLength({ max: 1000 }).withMessage('Description must be 1000 chars or fewer.'),
  body('badge').optional().isLength({ max: 50 }).withMessage('Badge must be 50 chars or fewer.'),
  body('validTill').optional().isString(),
  body('whatsappMessage').optional().isString(),
  body('active').optional().isBoolean().withMessage('active must be a boolean.'),
  handleValidation,
];

// ── Doctor validators ─────────────────────────────────────────────────────────
const validateDoctorUpdate = [
  body('availabilityStatus')
    .optional()
    .isIn(['available', 'limited', 'full', 'leave'])
    .withMessage('Invalid availability status.'),
  body('scheduleDay').optional().isString(),
  body('nextDate').optional().isString(),
  body('scheduleTime').optional().isString(),
  body('scheduleBadge').optional().isString(),
  body('availabilityLabel').optional().isString(),
  body('notice').optional().isString().isLength({ max: 500 }).withMessage('Notice must be 500 chars or fewer.'),
  handleValidation,
];

module.exports = { validateLogin, validateOffer, validateDoctorUpdate };

