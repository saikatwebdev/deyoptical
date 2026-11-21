'use strict';

const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    galleryId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Photo title is required'],
      trim: true,
      maxlength: [200, 'Title must be 200 characters or fewer'],
      default: 'Dey Optical Photo',
    },
    cat: {
      type: String,
      required: [true, 'Tag is required'],
      enum: ['Store', 'Eyewear'],
      default: 'Store',
      trim: true,
    },
    sub: {
      type: String,
      trim: true,
      default: '',
      maxlength: [250, 'Subtitle must be 250 characters or fewer'],
    },
    img: {
      type: String,
      required: [true, 'Image data or URL is required'],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    id: false,
  }
);

// Virtual id for frontend compatibility
galleryItemSchema.virtual('id').get(function () {
  return this.galleryId || this._id.toHexString();
});

galleryItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);

