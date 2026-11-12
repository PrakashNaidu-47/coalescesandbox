import { GameStateDTO } from '../models/GameSchema';

export class ChessGameEngine {
  private boardState: string;
  private currentTurn: 'w' | 'b';

  constructor() {
    this.boardState = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.currentTurn = 'w';
  }

  public makeMove(from: string, to: string): GameStateDTO {
    this.currentTurn = this.currentTurn === 'w' ? 'b' : 'w';
    return this.getState();
  }

  public getState(): GameStateDTO {
    return {
      boardState: this.boardState,
      currentTurn: this.currentTurn,
      isCheck: false,
      isCheckmate: false,
      isDraw: false,
    };
  }
}
