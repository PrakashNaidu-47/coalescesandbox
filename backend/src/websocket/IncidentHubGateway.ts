export class IncidentHubGateway {
  private clients: Set<any> = new Set();

  public handleConnection(socket: any): void {
    this.clients.add(socket);
    socket.on('disconnect', () => this.clients.delete(socket));
  }

  public broadcastEvent(eventType: string