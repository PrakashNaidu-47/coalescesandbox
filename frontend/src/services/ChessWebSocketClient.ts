export type WebSocketConnectionStatus = 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR';

export class ChessWebSocketClient {
  private ws: WebSocket | null = null;
  public status: WebSocketConnectionStatus = 'DISCONNECTED';

  constructor(private url: string, private onMessageCallback: (data: any) => void) {}

  public connect() {
    this.status = 'CONNECTING';
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => { this.status = 'CONNECTED'; };
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.onMessageCallback(data);
    };
    this.ws.onerror = () => { this.status = 'ERROR'; };
    this.ws.onclose = () => { this.status = 'DISCONNECTED'; };
  }

  public sendMove(move: { gameId: string; from: string; to: string }) {
    if (this.ws && this.status === 'CONNECTED') {
      this.ws.send(JSON.stringify({ type: 'MOVE', payload: move }));
    }
  }
}
