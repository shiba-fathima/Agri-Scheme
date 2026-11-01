"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';
import { defaultMockUser } from '../data/mockUser';

type Language = 'en' | 'hi' | 'ka';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  language: Language;
  setLanguage: (lang: Language) => void;
  savedSchemes: string[];
  toggleSaveScheme: (id: string) => void;
  appliedSchemes: { id: string; status: 'Pending' | 'Approved' | 'Rejected'; date: string }[];
  applyForScheme: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultMockUser);
  const [language, setLanguage] = useState<Language>('en');
  const [savedSchemes, setSavedSchemes] = useState<string[]>(['s1', 's4']); // Mock pre-saved
  const [appliedSchemes, setAppliedSchemes] = useState<AppContextType['appliedSchemes']>([
    { id: 's2', status: 'Approved', date: '2025-10-12' },
    { id: 's5', status: 'Pending', date: '2026-03-01' }
  ]); // Mock pre-applied

  const toggleSaveScheme = (id: string) => {
    setSavedSchemes(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const applyForScheme = (id: string) => {
    if (!appliedSchemes.find(s => s.id === id)) {
      setAppliedSchemes(prev => [...prev, { id, status: 'Pending', date: new Date().toISOString().split('T')[0] }]);
    }
  };

  return (
    <AppContext.Provider value={{
      user, setUser, language, setLanguage, savedSchemes, toggleSaveScheme, appliedSchemes, applyForScheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
