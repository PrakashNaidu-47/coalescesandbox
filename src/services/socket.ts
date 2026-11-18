import { io, Socket } from 'socket.io-client';
import { BoardState, GameStatus } from '../types/game';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

class WebSocketService {
  public socket: Socket | null = null;

  public connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {\n        autoConnect: true,\n        reconnectionAttempts: 5,\n      });
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public createRoom(userId: string, callback: (roomCode: string) => void) {
    this.connect();
    this.socket?.emit('create_room', { userId }, callback);
  }

  public joinRoom(roomCode: string, userId: string, callback: (success: boolean, message?: string) => void) {
    this.connect();
    this.socket?.emit('join_room', { roomCode, userId }, callback);
  }

  public makeMove(roomCode: string, index: number