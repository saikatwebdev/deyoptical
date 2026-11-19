'use strict';

const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

/**
 * Helper to build a flexible filter that matches either
 * custom `doctorId` (e.g. 'dr-soumen') or MongoDB `_id`
 */
const getDoctorFilter = (id) => {
  const conditions = [{ doctorId: id }];
  if (mongoose.Types.ObjectId.isValid(id)) {
    conditions.push({ _id: id });
  }
  return { $or: conditions };
};

/**
 * Helper — emit updated doctors to all connected socket clients
 */
const emitDoctorsUpdate = async (io) => {
  try {
    const doctors = await Doctor.find().sort({ order: 1, createdAt: 1 });
    io.emit('doctors:updated', doctors);
  } catch (e) {
    console.error('Socket emit error (doctors):', e.message);
  }
};

// ─── GET /api/doctors ────────────────────────────────────────────────────────
const getAll = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: doctors });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/doctors/:id ─────────────────────────────────────────────────── (auth)
// Admin can update schedule + availability fields only.
// Static display fields (name, photo, highlights, etc.) are not changed via UI.
const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Only allow these fields to be updated via admin panel
    const allowedFields = [
      'scheduleDay',
      'nextDate',
      'scheduleTime',
      'scheduleBadge',
      'availabilityStatus',
      'availabilityLabel',
      'notice',
      'whatsappMsg',
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const doctor = await Doctor.findOneAndUpdate(
      getDoctorFilter(id),
      updateData,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    const io = req.app.get('io');
    if (io) await emitDoctorsUpdate(io);

    res.json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, updateDoctor };

