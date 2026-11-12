import { useEffect, useRef } from 'react';
import { MovePayload, GameStateResponse, TypedWebSocketClient } from '../../../shared/types/chess';

export const useWebSocket = (url: string, gameId: string): TypedWebSocketClient => {
  const wsRef = useRef<WebSocket | null>(null);
  const callbackRef = useRef<((state: GameStateResponse) => void) | null>(null);

  const connect = () => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      wsRef.current?.send(JSON.stringify({ event: 'joinGame', gameId }));
    };
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.fen && callbackRef.current) {
        callbackRef.current(data);
      }
    };
  };

  const emitMove = (payload: MovePayload) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event: 'makeMove', ...payload }));
    }
  };

  const onStateUpdate = (callback: (state: GameStateResponse) => void) => {
    callbackRef.current = callback;
  };

  return {
    connect,
    emitMove,
    onStateUpdate,
  };
};
