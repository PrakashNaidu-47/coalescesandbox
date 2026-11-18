import { BoardState, PlayerMark } from '../types/game';
import { checkWinner, isBoardFull } from './gameEngine';

interface MinimaxResult {
  score: number;
  index: number;
}

export function getBestMove(board: BoardState, aiMark: PlayerMark): number {
  const humanMark: PlayerMark = aiMark === 'X' ? 'O' : 'X';

  function minimax(currentBoard: BoardState