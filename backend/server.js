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

// ── Express + HTTP server setup ───────────────────────────────────────────────
const app = express();
const httpServer = http.createServer(app);

// ── CORS Configuration ────────────────────────────────────────────────────────
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

const defaultOrigins = ['http://localhost:3000', 'http://localhost:5173'];
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

const corsOriginChecker = (origin, callback) => {
  // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
  if (!origin) return callback(null, true);
  if (
    allowedOrigins.includes(origin) ||
    (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:'))
  ) {
    return callback(null, true);
  }
  callback(new Error(`CORS blocked for origin: ${origin}`));
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
app.use(express.json({ limit: '10kb' })); // parse JSON body, limit size
app.use(express.urlencoded({ extended: false }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/doctors', doctorsRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Centralized error handler ─────────────────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();      // 1. Connect to MongoDB
  await seedDatabase();   // 2. Seed initial data if collections are empty

  httpServer.listen(PORT, () => {
    console.log(`🚀 Dey Optical backend running on http://localhost:${PORT}`);
    console.log(`🌐 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
    console.log(`📡 Socket.IO ready for real-time events`);
  });
};

start();

