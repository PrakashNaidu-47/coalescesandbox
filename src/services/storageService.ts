import { UserProfile, MatchHistoryItem, ThemeMode } from '../types/game';

const USER_KEY = 'tictactoe_user_profile_v1';
const HISTORY_KEY = 'tictactoe_match_history_v1';
const THEME_KEY = 'tictactoe_theme_v1';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'guest_' + Math.random().toString(36).substring(2, 9),
  username: 'Player 1',
  isGuest: true,
  elo: 1200,
  wins: 0,
  losses: 0,
  draws: 0,
  currentStreak: 0,
  maxStreak: 0,
};

export function loadUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      return JSON.parse(data) as UserProfile;
    }
  } catch (err) {
    console.error('Error loading user profile from storage', err);
  }
  saveUserProfile(DEFAULT_PROFILE);
  return DEFAULT_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export function loadMatchHistory(): MatchHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (data) {
      return JSON.parse(data) as MatchHistoryItem[];
    }
  } catch (err) {
    console.error('Error loading match history', err);
  }
  return [];
}

export function saveMatchHistory(history: MatchHistoryItem[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save match history', err);
  }
}

export function loadSavedTheme(): ThemeMode {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme && ['classic', 'neon', 'cyberpunk', 'highcontrast'].includes(theme)) {
      return theme as ThemeMode;
    }
  } catch (e) {
    console.error(e);
  }
  return 'neon';
}

export function saveSavedTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error(e);
  }
}