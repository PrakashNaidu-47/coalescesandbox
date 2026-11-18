import React from 'react';
import { Utensils, Search, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAdmin,
  isAdminLoggedIn,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-amber-600 text-white p-2 rounded-xl shadow-md">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">GourmetView</span>
            <span className="hidden sm:block text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wider">Digital Restaurant Menu</span>
          </div>
        </div>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes, ingredients..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden md:inline">Dashboard</span>
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 dark:border-gray-700 hover:border-amber-500 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};