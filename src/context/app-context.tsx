"use client";

import type { MoodLog, JournalEntry } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  wellnessTokens: number;
  addWellnessTokens: (amount: number) => void;
  moodLogs: MoodLog[];
  addMoodLog: (mood: MoodLog) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [wellnessTokens, setWellnessTokens] = useState(15);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const addWellnessTokens = (amount: number) => {
    setWellnessTokens(prev => prev + amount);
  };

  const addMoodLog = (log: MoodLog) => {
    setMoodLogs(prev => [...prev, log]);
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [entry, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      wellnessTokens,
      addWellnessTokens,
      moodLogs,
      addMoodLog,
      journalEntries,
      addJournalEntry
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
