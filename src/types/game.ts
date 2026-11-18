export type PlayerMark = 'X' | 'O' | null;
export type BoardState = PlayerMark[]; // Array of length 9

export type GameMode = 'LOCAL' | 'AI_EASY' | 'AI_MEDIUM' | 'AI_HARD' | 'ONLINE';
export type GameStatus = 'IDLE' | 'PLAYING' | 'X_WON' | 'O_WON' | 'DRAW' | 'PAUSED';
export type ThemeMode = 'light' | 'dark' | 'retro';

export interface UserProfile {
  id: string;
  username: string;
  eloRating: number;
  stats: {
    wins: number;
    losses: number;
    draws: number;
  };
}

export interface WebSocketPayload {
  roomCode: string;
  board: BoardState;
  currentTurn: 'X' | 'O';
  status: GameStatus;
  scores?: { X: number; O: number; draws: number };
}

export interface MoveHistoryItem {
  board: BoardState;
  currentTurn: 'X' | 'O';
  lastMoveIndex: number | null;
}