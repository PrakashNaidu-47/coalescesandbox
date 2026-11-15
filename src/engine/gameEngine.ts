import { BoardArray, WinResult, PlayerSymbol } from '../types/game';

export const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createEmptyBoard(): BoardArray {
  return Array(9).fill(null);
}

export function evaluateBoard(board: BoardArray): WinResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as PlayerSymbol, line };
    }
  }

  const isDraw = board.every((cell) => cell !== null);
  if (isDraw) {
    return { winner: 'DRAW', line: null };
  }

  return { winner: null, line: null };
}

export function getAvailableMoves(board: BoardArray): number[] {
  const moves: number[] = [];
  board.forEach((cell, idx) => {
    if (cell === null) moves.push(idx);
  });
  return moves;
}

export function isValidMove(board: BoardArray