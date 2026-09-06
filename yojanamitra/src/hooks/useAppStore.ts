/**
 * useAppStore.ts — Global application state using React context.
 * Stores: active UserProfile, language, and NLP extraction result.
 */

import { createContext, useContext, useState, useCallback } from 'react';
import type { UserProfile } from '../types';
import type { Language } from '../services/i18n';
import { DEMO_PROFILE } from '../data/mockData';

interface AppState {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  profileComplete: boolean;
}

const AppContext = createContext<AppState | null>(null);

export function useAppStore(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider');
  return ctx;
}

export function useAppProvider() {
  const [profile, setProfileState] = useState<UserProfile>(DEMO_PROFILE);
  const [language, setLanguage] = useState<Language>('en');

  const setProfile = useCallback((p: UserProfile) => setProfileState(p), []);
  const updateProfile = useCallback(
    (partial: Partial<UserProfile>) => setProfileState((prev) => ({ ...prev, ...partial })),
    []
  );

  const profileComplete =
    !!profile.businessType &&
    !!profile.district &&
    !!profile.state &&
    profile.age > 0 &&
    profile.availableCapital >= 0;

  return { profile, setProfile, updateProfile, language, setLanguage, profileComplete };
}

export { AppContext };
