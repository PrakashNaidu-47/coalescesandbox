import { MovePayload, GameState, WebSocketClientWrapper } from '../../shared/types/chess';

export class WebSocketClient implements WebSocketClientWrapper {
  private callback: ((state: GameState) => void) | null = null;

  public connect(gameId: string): void {
    console.log(`Connecting to WebSocket for game ${gameId}`);
  }

  public async sendMove(move: MovePayload): Promise<void> {
    console.log('Sending move:', move);
  }

  public onGameStateUpdate(callback: (state: GameState) => void): void {
    this.callback = callback;
  }

  public disconnect(): void {
    console.log('Disconnecting WebSocket');
    this.callback = null;
  }
}

export const wsClient = new WebSocketClient();
