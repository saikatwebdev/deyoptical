import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { io } from 'socket.io-client';
import { SPECIAL_OFFERS } from '../data/specialOffers.js';
import { DEFAULT_DOCTORS } from '../data/doctorsData.js';
import { GALLERY_ITEMS } from '../data/mockData.js';

// ── Config ──────────────────────────────────────────────────────────────────
const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = RAW_API_URL.replace(/\/+$/, '');
const AUTH_TOKEN_KEY = 'dey_admin_token';
const AUTH_SESSION_KEY = 'dey_admin_authenticated';

const AdminDataContext = createContext(null);

// ── Helper: authenticated fetch wrapper ─────────────────────────────────────
const apiFetch = async (path, options = {}) => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(`${API_URL}${cleanPath}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API request failed');
  return data;
};

// ── Provider ─────────────────────────────────────────────────────────────────
export function AdminDataProvider({ children }) {
  // ── Data state ─────────────────────────────────────────────────────────────
  const [offers, setOffers] = useState(SPECIAL_OFFERS);   // fallback to static until API loads
  const [doctors, setDoctors] = useState(DEFAULT_DOCTORS); // fallback to static until API loads
  const [gallery, setGallery] = useState(GALLERY_ITEMS);   // fallback to static until API loads
  const [apiReady, setApiReady] = useState(false);         // true once at least one fetch succeeds

  // ── Admin modal & auth state ───────────────────────────────────────────────
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_SESSION_KEY) === 'true'
  );

  // ── Socket.IO ref ─────────────────────────────────────────────────────────
  const socketRef = useRef(null);

  // ── Load initial data from API 
  useEffect(() => {
    const loadData = async () => {
      try {
        const [offersRes, doctorsRes, galleryRes] = await Promise.all([
          apiFetch('/api/offers').catch(() => ({ success: false })),
          apiFetch('/api/doctors').catch(() => ({ success: false })),
          apiFetch('/api/gallery').catch(() => ({ success: false })),
        ]);
        if (offersRes.success && offersRes.data) setOffers(offersRes.data);
        if (doctorsRes.success && doctorsRes.data) setDoctors(doctorsRes.data);
        if (galleryRes.success && galleryRes.data) setGallery(galleryRes.data);
        setApiReady(true);
      } catch (err) {
        console.warn('⚠️ Backend not reachable — using static data as fallback.', err.message);
        // Keep the static fallback data already in state
      }
    };
    loadData();
  }, []);

  // ── Socket.IO / Real-time updates ─────────────────────────────────────────
  useEffect(() => {
    // Vercel Serverless does not support persistent WebSockets/Socket.IO.
    // If backend is on Vercel, we gracefully switch to periodic polling (every 30s).
    const isVercelServerless = API_URL.includes('vercel.app');

    if (isVercelServerless) {
      console.info('ℹ️ Vercel Serverless backend detected — real-time updates active via background sync.');
      const interval = setInterval(async () => {
        try {
          const [offersRes, doctorsRes, galleryRes] = await Promise.all([
            apiFetch('/api/offers').catch(() => ({ success: false })),
            apiFetch('/api/doctors').catch(() => ({ success: false })),
            apiFetch('/api/gallery').catch(() => ({ success: false })),
          ]);
          if (offersRes.success && offersRes.data) setOffers(offersRes.data);
          if (doctorsRes.success && doctorsRes.data) setDoctors(doctorsRes.data);
          if (galleryRes.success && galleryRes.data) setGallery(galleryRes.data);
        } catch {
          // ignore background sync errors
        }
      }, 30000);

      return () => clearInterval(interval);
    }

    // Standard persistent server (Render, Railway, VPS, Localhost)
    const socket = io(API_URL, {
      transports: ['polling', 'websocket'],
      reconnectionAttempts: 5,
      timeout: 10000,
    });
    socketRef.current = socket;

    socket.on('connect_error', (err) => {
      console.warn('⚠️ Real-time socket connection warning:', err.message);
    });

    socket.on('connect', () => {
      console.log('📡 Socket.IO connected:', socket.id);
    });

    socket.on('offers:updated', (updatedOffers) => {
      console.log('📡 Real-time: offers updated');
      const seen = new Set();
      const unique = (updatedOffers || []).filter((o) => {
        const k = o.id || o.offerId || o._id;
        if (!k || seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      setOffers(unique);
    });

    socket.on('doctors:updated', (updatedDoctors) => {
      console.log('📡 Real-time: doctors updated');
      const seen = new Set();
      const unique = (updatedDoctors || []).filter((d) => {
        const k = d.id || d.doctorId || d._id;
        if (!k || seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      setDoctors(unique);
    });

    socket.on('gallery:updated', (updatedGallery) => {
      console.log('📡 Real-time: gallery updated');
      const seen = new Set();
      const unique = (updatedGallery || []).filter((g) => {
        const k = g.id || g.galleryId || g._id;
        if (!k || seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      setGallery(unique);
    });

    socket.on('disconnect', () => {
      console.log('📡 Socket.IO disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ── Authentication ────────────────────────────────────────────────────────
  const login = useCallback(async (password) => {
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: 'admin', password }),
      });
      if (data.success && data.token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, data.token);
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err.message);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  // changePasscode is no longer applicable (password is in .env on backend)
  // Kept as a no-op so AdminPanelModal doesn't need to change
  const changePasscode = useCallback(() => {
    console.info('Passcode change is managed in backend .env — not available via UI.');
    return false;
  }, []);

  // ── Offers CRUD ───────────────────────────────────────────────────────────
  const addOffer = useCallback(async (offer) => {
    try {
      const res = await apiFetch('/api/offers', {
        method: 'POST',
        body: JSON.stringify({ active: true, ...offer }),
      });
      if (res.success && res.data) {
        setOffers((prev) => {
          const newId = res.data.id || res.data.offerId || res.data._id;
          if (prev.some((o) => (o.id || o.offerId || o._id) === newId)) {
            return prev;
          }
          return [res.data, ...prev];
        });
      }
    } catch (err) {
      console.error('addOffer failed:', err.message);
    }
  }, []);

  const updateOffer = useCallback(async (id, updatedFields) => {
    try {
      // Find the existing offer to merge fields
      const existing = offers.find((o) => o.id === id || o.offerId === id || o._id === id);
      const payload = { ...existing, ...updatedFields };
      const res = await apiFetch(`/api/offers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (res.success && res.data) {
        setOffers((prev) =>
          prev.map((o) => (o.id === id || o.offerId === id || o._id === id ? res.data : o))
        );
      }
    } catch (err) {
      console.error('updateOffer failed:', err.message);
    }
  }, [offers]);

  const deleteOffer = useCallback(async (id) => {
    try {
      await apiFetch(`/api/offers/${id}`, { method: 'DELETE' });
      setOffers((prev) => prev.filter((o) => o.id !== id && o.offerId !== id && o._id !== id));
    } catch (err) {
      console.error('deleteOffer failed:', err.message);
    }
  }, []);

  const toggleOffer = useCallback(async (id) => {
    try {
      const res = await apiFetch(`/api/offers/${id}/toggle`, { method: 'PATCH' });
      if (res.success && res.data) {
        setOffers((prev) =>
          prev.map((o) => (o.id === id || o.offerId === id || o._id === id ? res.data : o))
        );
      }
    } catch (err) {
      console.error('toggleOffer failed:', err.message);
    }
  }, []);

  const resetOffers = useCallback(async () => {
    // Re-fetch from API (seeds are already in the DB)
    try {
      const res = await apiFetch('/api/offers');
      if (res.success) setOffers(res.data);
    } catch (err) {
      setOffers(SPECIAL_OFFERS);
    }
  }, []);

  // ── Doctors CRUD ──────────────────────────────────────────────────────────
  const updateDoctor = useCallback(async (id, updatedFields) => {
    try {
      const res = await apiFetch(`/api/doctors/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFields),
      });
      if (res.success && res.data) {
        setDoctors((prev) =>
          prev.map((d) => (d.id === id || d.doctorId === id || d._id === id ? res.data : d))
        );
      }
    } catch (err) {
      console.error('updateDoctor failed:', err.message);
    }
  }, []);

  const resetDoctors = useCallback(async () => {
    try {
      const res = await apiFetch('/api/doctors');
      if (res.success) setDoctors(res.data);
    } catch (err) {
      setDoctors(DEFAULT_DOCTORS);
    }
  }, []);

  // ── Gallery CRUD ──────────────────────────────────────────────────────────
  const uploadGalleryPhotos = useCallback(async (photos) => {
    try {
      const res = await apiFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify({ photos }),
      });
      if (res.success && res.data) {
        setGallery((prev) => {
          const newItems = Array.isArray(res.data) ? res.data : [res.data];
          const existingIds = new Set(prev.map((g) => g.id || g.galleryId || g._id));
          const filteredNew = newItems.filter(
            (item) => !existingIds.has(item.id || item.galleryId || item._id)
          );
          return [...filteredNew, ...prev];
        });
        return { success: true, count: Array.isArray(res.data) ? res.data.length : 1 };
      }
      return { success: false, message: res.message || 'Upload failed' };
    } catch (err) {
      console.error('uploadGalleryPhotos failed:', err.message);
      return { success: false, message: err.message };
    }
  }, []);

  const addGalleryPhoto = useCallback(async (photo) => {
    try {
      const res = await apiFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(photo),
      });
      if (res.success && res.data) {
        setGallery((prev) => {
          const newId = res.data.id || res.data.galleryId || res.data._id;
          if (prev.some((g) => (g.id || g.galleryId || g._id) === newId)) return prev;
          return [res.data, ...prev];
        });
        return { success: true, data: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      console.error('addGalleryPhoto failed:', err.message);
      return { success: false, message: err.message };
    }
  }, []);

  const updateGalleryPhoto = useCallback(async (id, updatedFields) => {
    try {
      const existing = gallery.find(
        (g) => g.id === id || g.galleryId === id || g._id === id
      );
      const payload = { ...existing, ...updatedFields };
      const res = await apiFetch(`/api/gallery/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (res.success && res.data) {
        setGallery((prev) =>
          prev.map((g) => (g.id === id || g.galleryId === id || g._id === id ? res.data : g))
        );
        return { success: true, data: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      console.error('updateGalleryPhoto failed:', err.message);
      return { success: false, message: err.message };
    }
  }, [gallery]);

  const deleteGalleryPhoto = useCallback(async (id) => {
    try {
      const res = await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.success) {
        setGallery((prev) =>
          prev.filter((g) => g.id !== id && g.galleryId !== id && g._id !== id)
        );
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      console.error('deleteGalleryPhoto failed:', err.message);
      return { success: false, message: err.message };
    }
  }, []);

  const resetGallery = useCallback(async () => {
    try {
      const res = await apiFetch('/api/gallery/reset', { method: 'POST' });
      if (res.success && res.data) {
        setGallery(res.data);
      }
    } catch (err) {
      setGallery(GALLERY_ITEMS);
    }
  }, []);

  const resetAllData = useCallback(async () => {
    await resetOffers();
    await resetDoctors();
    await resetGallery();
  }, [resetOffers, resetDoctors, resetGallery]);

  // ── Admin modal helpers ───────────────────────────────────────────────────
  const openAdmin = useCallback(() => setIsAdminOpen(true), []);
  const closeAdmin = useCallback(() => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // ── Hash listener (#admin) ────────────────────────────────────────────────
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') setIsAdminOpen(true);
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // ── Context value ─────────────────────────────────────────────────────────
  const value = {
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    toggleOffer,
    resetOffers,
    doctors,
    updateDoctor,
    resetDoctors,
    gallery,
    uploadGalleryPhotos,
    addGalleryPhoto,
    updateGalleryPhoto,
    deleteGalleryPhoto,
    resetGallery,
    resetAllData,
    isAdminOpen,
    openAdmin,
    closeAdmin,
    isAuthenticated,
    login,
    logout,
    changePasscode,
    apiReady,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
