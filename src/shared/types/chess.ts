export interface MovePayload {
  gameId: string;
  playerId: string;
  move: { from: string; to: string; promotion?: string };
  timestamp: number;
}

export interface GameState {
  gameId: string;
  fen: string;
  turn: 'w' | 'b';
  status: 'in_progress' | 'checkmate' | 'stalemate' | 'draw' | 'resigned';
  moveHistory: string[];
}

export interface WebSocketClientWrapper {
  connect(gameId: string): void;
  sendMove(move: MovePayload): Promise<void>;
  onGameStateUpdate(callback: (state: GameState) => void): void;
  disconnect(): void;
}
