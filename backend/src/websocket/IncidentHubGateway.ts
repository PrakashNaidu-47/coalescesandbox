export class IncidentHubGateway {
  private clients: Set<any> = new Set();

  public registerClient(client: any): void {
    this.clients.add(client);
  }

  public removeClient(client: any): void {
    this.clients.delete(client);
  }

  public broadcastEvent(eventType: string, payload: any): void {
    const message = JSON.stringify({ eventType, payload, timestamp: new Date().toISOString() });
    for (const client of this.clients) {
      try {
        if (client.readyState === 1) {
          client.send(message);
        }
      } catch (err) {
        console.error('Error broadcasting event to websocket client', err);
      }
    }
  }

  public getConnectedClientCount(): number {
    return this.clients.size;
  }
}
