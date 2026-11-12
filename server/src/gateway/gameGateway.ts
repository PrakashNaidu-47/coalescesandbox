import { MovePayload, GameStateResponse } from '../../../shared/types/chess';
import { GameEngineService } from '../services/gameEngineService';

export class GameGateway {
  private games: Map<string, GameEngineService> = new Map();

  public handleConnection(socket: any): void {
    socket.on('joinGame', ({ gameId }: { gameId: string }) => {
      socket.join(gameId);
      if (!this.games.has(gameId)) {
        this.games.set(gameId, new GameEngineService());
      }
      const game = this.games.get(gameId)!;
      socket.emit('stateUpdate', game.getState());
    });

    socket.on('makeMove', (payload: MovePayload) => {
      const game = this.games.get(payload.gameId);
      if (!game) return;
      const success = game.applyMove(payload.from, payload.to);
      if (success) {
        // Broadcast state update
      }
    });
  }
}
