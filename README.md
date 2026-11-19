# Dey Optical — Full-Stack Application

A complete optical shop website with admin panel and real-time MongoDB backend.

## Project Structure

```
deyoptical/
├── frontend/          ← React + Vite (existing)
└── backend/           ← Node.js + Express + MongoDB (new)
```

---

## 🚀 Quick Start

### 1. Set up the Backend

```bash
cd backend
cp .env.example .env
# Edit .env — fill in your MongoDB URI
npm install
npm run dev        # starts on http://localhost:5000
```

### 2. Set up the Frontend

```bash
cd frontend
# .env is already created with VITE_API_URL=http://localhost:5000
npm install        # installs socket.io-client added to package.json
npm run dev        # starts on http://localhost:5173
```

---

## ⚙️ Backend Environment Variables (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Backend port (default: `5000`) |
| `MONGODB_URI` | MongoDB Atlas or local URI |
| `JWT_SECRET` | Long random string for signing JWTs |
| `JWT_EXPIRES_IN` | Token expiry (default: `8h`) |
| `ADMIN_USERNAME` | Admin login username (default: `admin`) |
| `ADMIN_PASSWORD` | Admin login password (default: `deyadmin2026`) |
| `FRONTEND_URL` | Frontend origin for CORS (default: `http://localhost:5173`) |
| `NODE_ENV` | `development` or `production` |

> ⚠️ **Change `ADMIN_PASSWORD` and `JWT_SECRET` before deploying to production!**

---

## 📡 API Endpoints

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Returns JWT token |
| GET | `/api/auth/verify` | Yes | Checks token validity |

### Offers
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/offers` | No | List all offers (public) |
| POST | `/api/offers` | Yes | Create a new offer |
| PUT | `/api/offers/:id` | Yes | Update an offer |
| PATCH | `/api/offers/:id/toggle` | Yes | Toggle active/inactive |
| DELETE | `/api/offers/:id` | Yes | Delete an offer |

### Doctors / Schedules
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/doctors` | No | List all doctors (public) |
| PUT | `/api/doctors/:id` | Yes | Update doctor schedule/availability |

---

## 🔄 Real-Time (Socket.IO)

When admin changes data, the backend emits Socket.IO events to all connected visitors:

| Event | Payload | Trigger |
|---|---|---|
| `offers:updated` | Full offers array | Any offer create/update/delete/toggle |
| `doctors:updated` | Full doctors array | Any doctor update |

---

## 🔐 Admin Panel

Access the admin panel via:
- **URL**: `http://localhost:5173/#admin`
- **Footer link**: "Owner Portal" at the bottom of the website
- **Default password**: `deyadmin2026`

---

## 🌱 Database Seeding

On first startup, the backend auto-seeds MongoDB with:
- **5 initial special offers**
- **2 eye specialists** (Dr. Soumen Dandapath and Optom. Apurbo Kumar Patra)

Seeding only runs if the collections are empty — safe to restart the server.

