'use strict';

const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI in .env
 * Retries on failure (handled by Mongoose's built-in reconnect)
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are defaults in Mongoose 8+ but kept explicit for clarity
      serverSelectionTimeoutMS: 10000, // 10 s timeout
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1); // Crash fast — let the process manager restart
  }
};

module.exports = connectDB;

