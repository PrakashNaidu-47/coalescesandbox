import { GameStateResponse } from '../../../shared/types/chess';

export class GameEngineService {
  private fen: string;
  private history: string[];
  private whiteTime: number;
  private blackTime: number;
  private status: 'active' | 'checkmate' | 'draw' | 'stalemate';

  constructor(initialFen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', timeControlMs: number = 300000) {
    this.fen = initialFen;
    this.history = [];
    this.whiteTime = timeControlMs;
    this.blackTime = timeControlMs;
    this.status = 'active';
  }

  public getState(): GameStateResponse {
    return {
      fen: this.fen,
      history: this.history,
      whiteTime: this.whiteTime,
      blackTime: this.blackTime,
      status: this.status,
    };
  }

  public applyMove(from: string, to: string): boolean {
    if (this.status !== 'active') return false;
    this.history.push(`${from}-${to}`);
    return true;
  }
}
