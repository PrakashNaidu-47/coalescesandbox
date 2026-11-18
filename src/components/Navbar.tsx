import React from 'react';
import { GameMode, UserProfile } from '../types/chess';
import { Swords, Bot, Puzzle, LineChart, User, Volume2, VolumeX, Shield, Trophy } from 'lucide-react';

interface NavbarProps {
  currentMode: GameMode;
  setMode: (mode: GameMode) => void;
  user: UserProfile;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  setMode,
  user,
  soundEnabled,
  toggleSound,
}) => {
  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setMode('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              Chess<span className="text-emerald-400">Craft</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Real-Time Multiplayer & AI Arena</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode('matchmaking')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentMode === 'matchmaking'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Play Live</span>
          </button>

          <button
            onClick={() => setMode('ai')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentMode === 'ai'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>vs AI</span>
          </button>

          <button
            onClick={() => setMode('puzzle')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentMode === 'puzzle'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Puzzles</span>
          </button>

          <button
            onClick={() => setMode('analysis')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentMode === 'analysis'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Analysis</span>
          </button>
        </nav>

        {/* Right Actions & Profile */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-red-400" />}
          </button>

          <div 
            onClick={() => setMode('profile')}
            className={`flex items-center space-x-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl