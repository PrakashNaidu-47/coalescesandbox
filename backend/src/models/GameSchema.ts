export interface ChessMovePayload {
  gameId: string;
  from: string;
  to: string;
  promotion?: string;
}

export interface GameStateDTO {
  boardState: string;
  currentTurn: 'w' | 'b';
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
}
