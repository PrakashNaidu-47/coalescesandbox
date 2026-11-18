import React from 'react';
import { PlayerMark } from '../types/game';

interface CellProps {
  value: PlayerMark;
  onClick: () => void;
  isWinningCell: boolean;
  index: number;
  disabled: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, index, disabled }) => {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const ariaLabel = `Row ${row}, Column ${col}, ${value ? `Occupied by ${value}` : 'Empty'}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={ariaLabel}
      className={`h-24 sm:h-32 rounded-2xl flex items-center justify-center text-5xl sm:text-7xl font-black transition-all duration-300 shadow-lg transform active:scale-95 ${
        isWinningCell
          ? 'bg-emerald-500 text-white animate-bounce ring-4 ring-emerald-300'
          : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10'
      } ${value === 'X' ? 'text-cyan-400' : value === 'O' ? 'text-rose-400' : 'text-transparent'}`}
    >
      {value === 'X' && (
        <span className="animate-scaleIn drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">X</span>
      )}
      {value === 'O' && (
        <span className="animate-scaleIn drop-shadow-[0_0_15px_rgba(251,113,133,0.6)]">O</span>
      )}
    </button>
  );
};