import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { GameStateResponse } from '../../../shared/types/chess';

export const ChessBoard: React.FC<{ serverUrl: string; gameId: string }> = ({ serverUrl, gameId }) => {
  const [gameState, setGameState] = useState<GameStateResponse | null>(null);
  const ws = useWebSocket(serverUrl, gameId);

  useEffect(() => {
    ws.connect();
    ws.onStateUpdate((state) => {
      setGameState(state);
    });
  }, [serverUrl, gameId]);

  return (
    <div className="chess-board-container">
      <h2>Grandmaster Web Chess</h2>
      <div className="status">Status: {gameState?.status || 'Connecting...'}</div>
      <div className="fen">FEN: {gameState?.fen}</div>
    </div>
  );
};
