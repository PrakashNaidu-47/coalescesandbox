import { ChessGameEngine } from '../engine/ChessGameEngine';
import { ChessMovePayload } from '../models/GameSchema';

export class ChessGateway {
  private engines: Map<string, ChessGameEngine> = new Map();

  public handleConnection(socketId: string) {
    console.log(`Client connected: ${socketId}`);
  }

  public handleMove(payload: ChessMovePayload) {
    let engine = this.engines.get(payload.gameId);
    if (!engine) {
      engine = new ChessGameEngine();
      this.engines.set(payload.gameId, engine);
    }
    return engine.makeMove(payload.from, payload.to);
  }
}
