export interface MovePayload {
  gameId: string;
  from: string;
  to: string;
  promotion?: 'q' | 'r' | 'b' | 'n';
  clientTimestamp: number;
}

export interface GameStateResponse {
  fen: string;
  history: string[];
  whiteTime: number;
  blackTime: number;
  status: 'active' | 'checkmate' | 'draw' | 'stalemate';
}

export interface MatchmakingQueueItem {
  userId: string;
  rating: number;
  timeControl: string;
  joinedAt: number;
}

export type TypedWebSocketClient = {
  connect: () => void;
  emitMove: (payload: MovePayload) => void;
  onStateUpdate: (callback: (state: GameStateResponse) => void) => void;
};
