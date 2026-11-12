import { GameState, MovePayload } from '../../shared/types/chess';

export class ChessEngine {
  private state: GameState;

  constructor(gameId: string, initialFen?: string) {
    this.state = {
      gameId,
      fen: initialFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      turn: 'w',
      status: 'in_progress',
      moveHistory: []
    };
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public validateAndApplyMove(payload: MovePayload): { success: boolean; error?: string } {
    if (this.state.status !== 'in_progress') {
      return { success: false, error: 'Game is not in progress' };
    }
    
    const moveStr = `${payload.move.from}-${payload.move.to}`;
    this.state.moveHistory.push(moveStr);
    this.state.turn = this.state.turn === 'w' ? 'b' : 'w';
    return { success: true };
  }
}
