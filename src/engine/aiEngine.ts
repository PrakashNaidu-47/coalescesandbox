import { BoardArray, PlayerSymbol, AIDifficulty, MinimaxResult } from '../types/game';
import { evaluateBoard, getAvailableMoves } from './gameEngine';

export function getAIMove(
  board: BoardArray,
  aiSymbol: PlayerSymbol,
  humanSymbol: PlayerSymbol,
  difficulty: AIDifficulty
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  if (difficulty === 'EASY') {
    return getRandomMove(availableMoves);
  }

  if (difficulty === 'MEDIUM') {
    // 50% chance of optimal move, 50% chance random
    if (Math.random() < 0.5) {
      return getRandomMove(availableMoves);
    }
    // Fall through to heuristic/minimax logic
    const winningMove = findImmediateWinningMove(board, aiSymbol);
    if (winningMove !== null) return winningMove;

    const blockMove = findImmediateWinningMove(board, humanSymbol);
    if (blockMove !== null) return blockMove;

    return getRandomMove(availableMoves);
  }

  // HARD / UNBEATABLE (Minimax with Alpha-Beta Pruning)
  const best = minimax(board, aiSymbol, humanSymbol, true, 0, -Infinity, Infinity);
  return best.index;
}

function getRandomMove(moves: number[]): number {
  return moves[Math.floor(Math.random() * moves.length)];
}

function findImmediateWinningMove(board: BoardArray