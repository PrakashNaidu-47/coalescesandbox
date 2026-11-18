import React from 'react';
import { Category } from '../types';
import { Layers } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategoryId: string | undefined;
  onSelectCategory: (id: string | undefined) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[73px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectCategory(undefined)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
            selectedCategoryId === undefined
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" /> All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              selectedCategoryId === cat.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
};