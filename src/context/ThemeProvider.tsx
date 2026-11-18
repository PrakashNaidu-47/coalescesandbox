import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types/game';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('xoxo_theme') as ThemeMode) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('xoxo_theme', theme);
    document.documentElement.classList.remove('light', 'dark', 'retro');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme