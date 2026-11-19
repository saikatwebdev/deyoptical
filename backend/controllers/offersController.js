'use strict';

const mongoose = require('mongoose');
const Offer = require('../models/Offer');

/**
 * Helper to build a flexible filter that matches either
 * custom `offerId` (e.g. 'offer-1') or MongoDB `_id`
 */
const getOfferFilter = (id) => {
  const conditions = [{ offerId: id }];
  if (mongoose.Types.ObjectId.isValid(id)) {
    conditions.push({ _id: id });
  }
  return { $or: conditions };
};

/**
 * Helper — emit updated offers to all connected socket clients
 */
const emitOffersUpdate = async (io) => {
  try {
    const offers = await Offer.find().sort({ order: 1, createdAt: 1 });
    io.emit('offers:updated', offers);
  } catch (e) {
    console.error('Socket emit error (offers):', e.message);
  }
};

// ─── GET /api/offers ─────────────────────────────────────────────────────────
const getAll = async (req, res, next) => {
  try {
    const offers = await Offer.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: offers });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/offers ─────────────────────────────────────────────────────── (auth)
const create = async (req, res, next) => {
  try {
    const { title, description, badge, validTill, whatsappMessage, active, order } = req.body;

    // Generate a unique slug id
    const offerId = `offer-${Date.now()}`;

    const offer = await Offer.create({
      offerId,
      title,
      description,
      badge: badge || '',
      validTill: validTill || '',
      whatsappMessage: whatsappMessage || '',
      active: active !== undefined ? active : true,
      order: order !== undefined ? order : 0,
    });

    // Real-time push
    const io = req.app.get('io');
    if (io) await emitOffersUpdate(io);

    res.status(201).json({ success: true, data: offer });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/offers/:id ─────────────────────────────────────────────────── (auth)
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, badge, validTill, whatsappMessage, active, order } = req.body;

    const offer = await Offer.findOneAndUpdate(
      getOfferFilter(id),
      { title, description, badge, validTill, whatsappMessage, active, order },
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found.' });
    }

    const io = req.app.get('io');
    if (io) await emitOffersUpdate(io);

    res.json({ success: true, data: offer });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/offers/:id/toggle ────────────────────────────────────────── (auth)
const toggleActive = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findOne(getOfferFilter(id));
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found.' });
    }

    offer.active = !offer.active;
    await offer.save();

    const io = req.app.get('io');
    if (io) await emitOffersUpdate(io);

    res.json({ success: true, data: offer });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/offers/:id ──────────────────────────────────────────────── (auth)
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findOneAndDelete(getOfferFilter(id));
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found.' });
    }

    const io = req.app.get('io');
    if (io) await emitOffersUpdate(io);

    res.json({ success: true, message: 'Offer deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, update, toggleActive, remove };

