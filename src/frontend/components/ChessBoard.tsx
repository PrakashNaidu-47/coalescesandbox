import React, { useEffect, useState } from 'react';
import { GameState } from '../../shared/types/chess';
import { gameStore } from '../state/gameStore';
import { wsClient } from '../services/WebSocketClient';

export const ChessBoard: React.FC<{ gameId: string; playerId: string }> = ({ gameId, playerId }) => {
  const [gameState, setGameState] = useState<GameState | null>(gameStore.getState());

  useEffect(() => {
    wsClient.connect(gameId);
    const unsubscribe = gameStore.subscribe((state) => {
      setGameState(state);
    });

    wsClient.onGameStateUpdate((newState) => {
      gameStore.setState(newState);
    });

    return () => {
      unsubscribe();
      wsClient.disconnect();
    };
  }, [gameId]);

  const handleSquareClick = async (square: string) => {
    if (!gameState) return;
    await wsClient.sendMove({
      gameId,
      playerId,
      move: { from: 'e2', to: square },
      timestamp: Date.now()
    });
  };

  return (
    <div className="chess-board-container">
      <h2>Game ID: {gameId}</h2>
      <div className="board-status">Turn: {gameState?.turn || 'w'}</div>
      <div className="board-grid">
        {['8', '7', '6', '5', '4', '3', '2', '1'].map((rank) => (
          <div key={rank} className="rank">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => {
              const sq = `${file}${rank}`;
              return (
                <button key={sq} onClick={() => handleSquareClick(sq)} className="square">
                  {sq}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
