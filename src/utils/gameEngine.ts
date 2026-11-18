import { BoardState, GameStatus, PlayerMark } from '../types/game';

export const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: BoardState): { winner: PlayerMark; combination: number[] | null } {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combination: combo };
    }
  }
  return { winner: null, combination: null };
}

export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

export function evaluateGameStatus(board: BoardState): GameStatus {
  const { winner } = checkWinner(board);
  if (winner === 'X') return 'X_WON';
  if (winner === 'O') return 'O_WON';
  if (isBoardFull(board)) return 'DRAW';
  return 'PLAYING';
}

export function createEmptyBoard(): BoardState {
  return Array(9).fill(null);
}