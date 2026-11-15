export type PlayerSymbol = 'X' | 'O';
export type CellValue = PlayerSymbol | null;
export type BoardArray = CellValue[];

export type GameMode = 'LOCAL_2P' | 'VS_AI' | 'MULTIPLAYER_PUBLIC' | 'MULTIPLAYER_PRIVATE';
export type AIDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type ThemeMode = 'classic' | 'neon' | 'cyberpunk' | 'highcontrast';

export interface WinResult {
  winner: PlayerSymbol | 'DRAW' | null;
  line: number[] | null;
}

export interface GameConfig {
  mode: GameMode;
  aiDifficulty: AIDifficulty;
  playerSymbol: PlayerSymbol;
  startingSymbol: PlayerSymbol;
}

export interface UserProfile {
  id: string;
  username: string;
  isGuest: boolean;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  currentStreak: number;
  maxStreak: number;
}

export interface MinimaxResult {
  score: number;
  index: number;
}

export interface SocketMessage<T = unknown> {
  type: 'MATCH_FOUND' | 'MOVE_MADE' | 'GAME_OVER' | 'OPPONENT_DISCONNECTED' | 'JOIN_ROOM' | 'SEARCH_MATCH';
  payload: T;
}

export interface MatchHistoryItem {
  id: string;
  date: string;
  opponent: string;
  mode: GameMode;
  result: 'WIN' | 'LOSS' | 'DRAW';
  eloChange: number;
}