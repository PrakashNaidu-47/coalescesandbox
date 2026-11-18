import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/game';

interface AuthContextType {
  user: UserProfile | null;
  login: (username: string) => void;
  logout: () => void;
  updateStats: (result: 'win' | 'loss' | 'draw') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('xoxo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default guest profile
    const guest: UserProfile = {
      id: 'guest-' + Math.random().toString(36).substring(2, 9),
      username: 'Guest_' + Math.floor(Math.random() * 9000 + 1000),
      eloRating: 1200,
      stats: { wins: 0, losses: 0, draws: 0 },
    };
    localStorage.setItem('xoxo_user', JSON.stringify(guest));
    return guest;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('xoxo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('xoxo_user');
    }
  }, [user]);

  const login = (username: string) => {
    const newUser: UserProfile = {
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      username,
      eloRating: 1200,
      stats: { wins: 0, losses: 0, draws: 0 },
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateStats = (result: 'win' | 'loss' | 'draw') => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      const newStats = { ...prev.stats };
      let eloChange = 0;
      if (result === 'win') {
        newStats.wins += 1;
        eloChange = 15;
      } else if (result === 'loss') {
        newStats.losses += 1;
        eloChange = -15;
      } else {
        newStats.draws += 1;
        eloChange = 5;
      }
      return {
        ...prev,
        eloRating: Math.max(100, prev.eloRating + eloChange),
        stats: newStats,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateStats }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};