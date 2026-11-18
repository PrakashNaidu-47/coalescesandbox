import React from 'react';
import { Utensils, Search, Lock, UserCheck, RefreshCw } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
  onLogout: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  isAdmin,
  onOpenAdmin,
  onLogout,
  onRefresh,
  isLoading,
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSearchChange('')}>
          <div className="bg-amber-500 p-2.5 rounded-xl text-slate-900 shadow">
            <Utensils className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              GourmetView
            </h1>
            <p className="text-xs text-slate-400">Digital Restaurant Menu &amp; Experience</p>
          </div>
        </div>

        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search dishes, ingredients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm placeholder-slate-400"
            aria-label="Search menu"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh Menu"
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
            aria-label="Refresh Menu"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/20">
                <UserCheck className="w-3.5 h-3.5" /> Admin Mode
              </span>
              <button
                onClick={onLogout}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-lg text-sm font-medium transition shadow"
            >
              <Lock className="w-4 h-4" /> Admin Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};