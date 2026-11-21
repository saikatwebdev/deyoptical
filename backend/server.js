'use strict';

require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server: SocketIOServer } = require('socket.io');
const cors = require('cors');

const connectDB = require('./config/db');
const seedDatabase = require('./utils/seedData');
const errorHandler = require('./middleware/errorHandler');

// ── Routes ────────────────────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const offersRoutes = require('./routes/offersRoutes');
const doctorsRoutes = require('./routes/doctorsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// ── Express + HTTP server setup ───────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

// ── CORS Configuration ────────────────────────────────────────────────────────
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, '')) // strip trailing slashes
  .filter(Boolean);

const defaultOrigins = ['http://localhost:3000', 'http://localhost:5173'];
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // allow mobile / server-to-server / curl
  const cleanOrigin = origin.replace(/\/$/, '');
  if (allowedOrigins.includes(cleanOrigin)) return true;
  // Automatically allow all Vercel deployments (production + preview domains)
  if (/\.vercel\.app$/.test(new URL(origin).hostname)) return true;
  // Allow localhost in non-production
  if (process.env.NODE_ENV !== 'production' && cleanOrigin.startsWith('http://localhost:')) {
    return true;
  }
  return false;
};

const corsOriginChecker = (origin, callback) => {
  try {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    console.warn(`[CORS] Origin rejected: ${origin}`);
    callback(null, false);
  } catch (err) {
    callback(null, false);
  }
};

// ── Socket.IO ─────────────────────────────────────────────────────────────────
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: corsOriginChecker,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});

// Make io accessible in controllers via req.app.get('io')
app.set('io', io);

io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: corsOriginChecker,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '50mb' })); // parse JSON body, allow photo uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── Normalize duplicate slashes in URL paths (e.g. //api/offers -> /api/offers) ──
app.use((req, _res, next) => {
  if (req.url && req.url.includes('//')) {
    req.url = req.url.replace(/\/+/g, '/');
  }
  next();
});

// ── Ensure DB connection before handling requests (critical for serverless like Vercel) ──
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/gallery', galleryRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Centralized error handler ─────────────────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();      // 1. Connect to MongoDB
    await seedDatabase();   // 2. Seed initial data if collections are empty

    httpServer.listen(PORT, () => {
      console.log(`🚀 Dey Optical backend running on http://localhost:${PORT}`);
      console.log(`🌐 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
      console.log(`📡 Socket.IO ready for real-time events`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
  }
};

// Export app for serverless hosts (Vercel)
module.exports = app;

// Listen only when not running inside Vercel serverless
if (!process.env.VERCEL) {
  start();
}

