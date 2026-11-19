'use strict';

const mongoose = require('mongoose');

let cachedPromise = null;

/**
 * Connect to MongoDB using the URI in .env.
 * Caches the connection across serverless invocations (e.g. Vercel).
 */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then((conn) => {
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((err) => {
        cachedPromise = null;
        console.error(`❌ MongoDB connection error: ${err.message}`);
        throw err;
      });
  }

  return cachedPromise;
};

module.exports = connectDB;

