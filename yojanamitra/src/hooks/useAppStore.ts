/**
 * useAppStore.ts — Global application state using React context.
 * Stores: active UserProfile, language, auth state, and NLP extraction result.
 *
 * IMPORTANT: No default Chai Stall / Sunita profile.
 * Profile is EMPTY by default. Populated only after user input.
 */

import { createContext, useContext, useState, useCallback } from 'react';
import type { UserProfile } from '../types';
import type { Language } from '../services/i18n';
import type { AuthUser } from '../services/AuthService';
import { getCurrentUser, logout as authLogout } from '../services/AuthService';

// ─── Empty default profile (NO Chai Stall, NO Sunita) ─────────────────────────
export const EMPTY_PROFILE: UserProfile = {
  id: '',
  name: '',
  age: 0,
  gender: 'prefer_not_to_say',
  category: 'general',
  state: '',
  district: '',
  isUrban: true,
  pincode: '',
  businessType: '',
  businessStage: 'idea',
  occupation: 'unemployed',
  isStreetVendor: false,
  monthlyRevenue: 0,
  annualFamilyIncome: 0,
  availableCapital: 0,
  fundingRequirement: 0,
  existingLoan: false,
  previousPMEGPBeneficiary: false,
  previousMUDRABeneficiary: false,
  previousSVANidhiBeneficiary: false,
  hasCIBILDefault: false,
  aadhaarVerified: false,
  panAvailable: false,
  bankAccount: false,
  casteCertificateAvailable: false,
  educationLevel: '10th_pass',
  hasStreetVendorCertificate: false,
  createdAt: new Date().toISOString(),
};

// ─── Demo Profile (ONLY accessible via loadDemoProfile()) ─────────────────────
export const DEMO_PROFILE: UserProfile = {
  id: 'demo-001',
  name: 'Demo Entrepreneur',
  age: 32,
  gender: 'female',
  category: 'obc',
  state: 'Maharashtra',
  district: 'Pune',
  isUrban: true,
  pincode: '411001',
  businessType: 'Vegetable Vendor',
  businessStage: 'idea',
  occupation: 'street_vendor',
  isStreetVendor: true,
  monthlyRevenue: 20000,
  annualFamilyIncome: 240000,
  availableCapital: 50000,
  fundingRequirement: 200000,
  existingLoan: false,
  previousPMEGPBeneficiary: false,
  previousMUDRABeneficiary: false,
  previousSVANidhiBeneficiary: false,
  hasCIBILDefault: false,
  aadhaarVerified: true,
  panAvailable: true,
  bankAccount: true,
  casteCertificateAvailable: true,
  educationLevel: '10th_pass',
  hasStreetVendorCertificate: false,
  createdAt: '2026-09-15T10:30:00Z',
};

// ─── Persisted language ────────────────────────────────────────────────────────
function getPersistedLanguage(): Language {
  try {
    const lang = localStorage.getItem('ym_language');
    if (lang === 'hi' || lang === 'mr' || lang === 'en') return lang;
  } catch { /* ignore */ }
  return 'en';
}

function persistLanguage(lang: Language): void {
  try { localStorage.setItem('ym_language', lang); } catch { /* ignore */ }
}

// ─── Persisted profile ─────────────────────────────────────────────────────────
function getPersistedProfile(): UserProfile {
  try {
    const raw = sessionStorage.getItem('ym_profile');
    if (raw) return JSON.parse(raw) as UserProfile;
  } catch { /* ignore */ }
  return EMPTY_PROFILE;
}

function persistProfile(p: UserProfile): void {
  try { sessionStorage.setItem('ym_profile', JSON.stringify(p)); } catch { /* ignore */ }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppState {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  resetProfile: () => void;
  loadDemoProfile: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
  profileComplete: boolean;
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppStore(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider');
  return ctx;
}

export function useAppProvider() {
  const [profile, setProfileState] = useState<UserProfile>(getPersistedProfile);
  const [language, setLanguageState] = useState<Language>(getPersistedLanguage);
  const [currentUser, setCurrentUserState] = useState<AuthUser | null>(() => getCurrentUser());

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
    persistProfile(p);
  }, []);

  const updateProfile = useCallback(
    (partial: Partial<UserProfile>) =>
      setProfileState((prev) => {
        const next = { ...prev, ...partial };
        persistProfile(next);
        return next;
      }),
    []
  );

  const resetProfile = useCallback(() => {
    setProfileState(EMPTY_PROFILE);
    sessionStorage.removeItem('ym_profile');
  }, []);

  const loadDemoProfile = useCallback(() => {
    setProfileState(DEMO_PROFILE);
    persistProfile(DEMO_PROFILE);
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    persistLanguage(l);
  }, []);

  const setCurrentUser = useCallback((user: AuthUser | null) => {
    setCurrentUserState(user);
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setCurrentUserState(null);
    setProfileState(EMPTY_PROFILE);
    sessionStorage.removeItem('ym_profile');
    sessionStorage.removeItem('extractionResult');
  }, []);

  const profileComplete =
    !!profile.businessType &&
    !!profile.district &&
    !!profile.state &&
    profile.age > 0 &&
    profile.availableCapital >= 0;

  return {
    profile,
    setProfile,
    updateProfile,
    resetProfile,
    loadDemoProfile,
    language,
    setLanguage,
    profileComplete,
    currentUser,
    setCurrentUser,
    logout,
  };
}

export { AppContext };
