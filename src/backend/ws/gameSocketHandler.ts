import { ChessEngine } from '../engine/chessEngine';
import { MovePayload, GameState } from '../../shared/types/chess';

export class GameSocketHandler {
  private engines: Map<string, ChessEngine> = new Map();

  public handleConnection(socketId: string, gameId: string): GameState {
    if (!this.engines.has(gameId)) {
      this.engines.set(gameId, new ChessEngine(gameId));
    }
    const engine = this.engines.get(gameId)!;
    return engine.getState();
  }

  public handleMove(payload: MovePayload): { state?: GameState; error?: string } {
    const engine = this.engines.get(payload.gameId);
    if (!engine) {
      return { error: 'Game session not found' };
    }

    const result = engine.validateAndApplyMove(payload);
    if (!result.success) {
      return { error: result.error };
    }

    return { state: engine.getState() };
  }
}
