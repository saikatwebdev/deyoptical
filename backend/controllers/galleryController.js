'use strict';

const mongoose = require('mongoose');
const GalleryItem = require('../models/GalleryItem');

/**
 * Helper to build a flexible filter matching either custom `galleryId` or MongoDB `_id`
 */
const getGalleryFilter = (id) => {
  const conditions = [{ galleryId: id }];
  if (mongoose.Types.ObjectId.isValid(id)) {
    conditions.push({ _id: id });
  }
  return { $or: conditions };
};

/**
 * Helper: emit updated gallery items to all connected socket clients
 */
const emitGalleryUpdate = async (io) => {
  if (!io) return;
  try {
    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
    io.emit('gallery:updated', items);
  } catch (e) {
    console.error('Socket emit error (gallery):', e.message);
  }
};

// ─── GET /api/gallery ────────────────────────────────────────────────────────
const getAll = async (req, res, next) => {
  try {
    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/gallery ─────────────────────────────────────────────────────── (admin only)
// Supports uploading a single photo or multiple photos ({ photos: [...] })
const create = async (req, res, next) => {
  try {
    const io = req.app.get('io');
    const { photos, title, cat, sub, img, order } = req.body;

    // Multiple photos batch upload
    if (Array.isArray(photos) && photos.length > 0) {
      const createdItems = [];
      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        if (!p.img) continue;

        const galleryId = `gallery-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`;
        const validCat = p.cat === 'Eyewear' ? 'Eyewear' : 'Store';
        const photoTitle = p.title?.trim() || `Dey Optical Photo ${i + 1}`;

        const item = await GalleryItem.create({
          galleryId,
          title: photoTitle,
          cat: validCat,
          sub: p.sub?.trim() || '',
          img: p.img,
          order: p.order !== undefined ? p.order : i,
        });
        createdItems.push(item);
      }

      await emitGalleryUpdate(io);
      return res.status(201).json({
        success: true,
        message: `Successfully uploaded ${createdItems.length} photos.`,
        data: createdItems,
      });
    }

    // Single photo upload
    if (!img) {
      return res.status(400).json({ success: false, message: 'Image data is required.' });
    }

    const galleryId = `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const validCat = cat === 'Eyewear' ? 'Eyewear' : 'Store';

    const item = await GalleryItem.create({
      galleryId,
      title: title?.trim() || 'Dey Optical Showcase',
      cat: validCat,
      sub: sub?.trim() || '',
      img,
      order: order !== undefined ? order : 0,
    });

    await emitGalleryUpdate(io);

    res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully.',
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/gallery/:id ─────────────────────────────────────────────────── (admin only)
// Update a photo's tag, title, or details
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, cat, sub, order, img } = req.body;

    const filter = getGalleryFilter(id);
    const item = await GalleryItem.findOne(filter);

    if (!item) {
      return res.status(404).json({ success: false, message: `Gallery photo "${id}" not found.` });
    }

    if (title !== undefined) item.title = title.trim();
    if (cat !== undefined) item.cat = cat === 'Eyewear' ? 'Eyewear' : 'Store';
    if (sub !== undefined) item.sub = sub.trim();
    if (order !== undefined) item.order = Number(order) || 0;
    if (img !== undefined && img.trim()) item.img = img;

    await item.save();

    const io = req.app.get('io');
    await emitGalleryUpdate(io);

    res.json({
      success: true,
      message: 'Gallery photo updated successfully.',
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/gallery/:id ──────────────────────────────────────────────── (admin only)
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = getGalleryFilter(id);

    const deleted = await GalleryItem.findOneAndDelete(filter);

    if (!deleted) {
      return res.status(404).json({ success: false, message: `Gallery photo "${id}" not found.` });
    }

    const io = req.app.get('io');
    await emitGalleryUpdate(io);

    res.json({
      success: true,
      message: 'Photo deleted successfully from gallery.',
      deletedId: id,
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/gallery/reset ──────────────────────────────────────────────── (admin only)
const reset = async (req, res, next) => {
  try {
    const seedDatabase = require('../utils/seedData');
    await GalleryItem.deleteMany({});
    await seedDatabase(true); // force re-seed

    const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 });

    const io = req.app.get('io');
    await emitGalleryUpdate(io);

    res.json({
      success: true,
      message: 'Gallery restored to default photos.',
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  reset,
};

