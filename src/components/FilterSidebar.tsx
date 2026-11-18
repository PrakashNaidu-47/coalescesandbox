import React from 'react';
import { FilterState } from '../types';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const AVAILABLE_TAGS = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Spicy', 'Nut-Free', 'Chef Special'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const toggleTag = (tag: string) => {
    const exists = filters.dietaryTags.includes(tag);
    const updatedTags = exists
      ? filters.dietaryTags.filter((t) => t !== tag)
      : [...filters.dietaryTags, tag];
    onFilterChange({ ...filters