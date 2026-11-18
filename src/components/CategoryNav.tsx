import React from 'react';
import { Category } from '../types';
import { LayoutGrid } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory: (id?: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory
}) => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        <button
          onClick={() => onSelectCategory(undefined)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
            !selectedCategoryId
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>All Dishes</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};