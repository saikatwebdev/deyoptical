import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SPECIAL_OFFERS } from '../data/specialOffers.js';
import { DEFAULT_DOCTORS } from '../data/doctorsData.js';

const OFFERS_STORAGE_KEY = 'dey_special_offers_v1';
const DOCTORS_STORAGE_KEY = 'dey_doctors_data_v1';
const ADMIN_PIN_STORAGE_KEY = 'dey_admin_pin_v1';
const AUTH_SESSION_KEY = 'dey_admin_authenticated';
const DEFAULT_PIN = 'deyadmin2026';

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  // ── State for Special Offers ──
  const [offers, setOffersState] = useState(() => {
    try {
      const saved = localStorage.getItem(OFFERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved offers from localStorage', e);
    }
    return SPECIAL_OFFERS;
  });

  // ── State for Doctors & Specialists ──
  const [doctors, setDoctorsState] = useState(() => {
    try {
      const saved = localStorage.getItem(DOCTORS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved doctors from localStorage', e);
    }
    return DEFAULT_DOCTORS;
  });

  // ── Admin Modal & Auth State ──
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });

  // ── Sync Offers to localStorage ──
  const saveOffers = useCallback((newOffers) => {
    setOffersState(newOffers);
    try {
      localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(newOffers));
    } catch (e) {
      console.error('Error saving offers to localStorage', e);
    }
  }, []);

  // ── Sync Doctors to localStorage ──
  const saveDoctors = useCallback((newDoctors) => {
    setDoctorsState(newDoctors);
    try {
      localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(newDoctors));
    } catch (e) {
      console.error('Error saving doctors to localStorage', e);
    }
  }, []);

  // ── Offer Mutators ──
  const addOffer = useCallback((offer) => {
    const newOffer = {
      id: `offer-${Date.now()}`,
      active: true,
      ...offer,
    };
    saveOffers([newOffer, ...offers]);
  }, [offers, saveOffers]);

  const updateOffer = useCallback((id, updatedFields) => {
    const next = offers.map((o) => (o.id === id ? { ...o, ...updatedFields } : o));
    saveOffers(next);
  }, [offers, saveOffers]);

  const deleteOffer = useCallback((id) => {
    const next = offers.filter((o) => o.id !== id);
    saveOffers(next);
  }, [offers, saveOffers]);

  const toggleOffer = useCallback((id) => {
    const next = offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o));
    saveOffers(next);
  }, [offers, saveOffers]);

  const resetOffers = useCallback(() => {
    saveOffers(SPECIAL_OFFERS);
  }, [saveOffers]);

  // ── Doctor Mutators ──
  const updateDoctor = useCallback((id, updatedFields) => {
    const next = doctors.map((d) => (d.id === id ? { ...d, ...updatedFields } : d));
    saveDoctors(next);
  }, [doctors, saveDoctors]);

  const resetDoctors = useCallback(() => {
    saveDoctors(DEFAULT_DOCTORS);
  }, [saveDoctors]);

  // ── Reset All Data ──
  const resetAllData = useCallback(() => {
    saveOffers(SPECIAL_OFFERS);
    saveDoctors(DEFAULT_DOCTORS);
  }, [saveOffers, saveDoctors]);

  // ── Authentication Actions ──
  const login = useCallback((passcode) => {
    const currentPin = localStorage.getItem(ADMIN_PIN_STORAGE_KEY) || DEFAULT_PIN;
    if (passcode.trim() === currentPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }, []);

  const changePasscode = useCallback((newPasscode) => {
    if (!newPasscode || newPasscode.trim().length < 4) return false;
    localStorage.setItem(ADMIN_PIN_STORAGE_KEY, newPasscode.trim());
    return true;
  }, []);

  const openAdmin = useCallback(() => {
    setIsAdminOpen(true);
  }, []);

  const closeAdmin = useCallback(() => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // ── Hash listener (#admin) ──
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

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
    resetAllData,
    isAdminOpen,
    openAdmin,
    closeAdmin,
    isAuthenticated,
    login,
    logout,
    changePasscode,
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

