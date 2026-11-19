'use strict';

const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    // Slug-style string id kept for frontend compatibility (e.g. 'offer-1')
    // This is NOT the Mongo _id; it's a stable human-readable identifier used by the frontend.
    offerId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true,
      maxlength: [200, 'Title must be 200 characters or fewer'],
    },
    description: {
      type: String,
      required: [true, 'Offer description is required'],
      trim: true,
      maxlength: [1000, 'Description must be 1000 characters or fewer'],
    },
    badge: {
      type: String,
      trim: true,
      maxlength: [50, 'Badge must be 50 characters or fewer'],
      default: '',
    },
    validTill: {
      type: String,
      trim: true,
      default: '',
    },
    whatsappMessage: {
      type: String,
      trim: true,
      default: '',
    },
    // Display order (lower = shown first)
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
    id: false,        // disable default virtual to prevent collision with custom id
  }
);

// Virtual so the frontend can use `id` consistently
offerSchema.virtual('id').get(function () {
  return this.offerId || this._id?.toString();
});

offerSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret.offerId || ret._id?.toString();
    if (ret._id) ret._id = ret._id.toString();
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Offer', offerSchema);

