import React from 'react';
import { GameStateDTO } from '../../../backend/src/models/GameSchema';

interface ChessBoardProps {
  gameState: GameStateDTO;
  onMove: (from: string, to: string) => void;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ gameState, onMove }) => {
  return (
    <div className="chess-board">
      <h2>Current Turn: {gameState.currentTurn.toUpperCase()}</h2>
      {gameState.isCheck && <div className="alert">Check!</div>}
      <div className="board-grid">
        <p>Board Fen: {gameState.boardState}</p>
      </div>
    </div>
  );
};
