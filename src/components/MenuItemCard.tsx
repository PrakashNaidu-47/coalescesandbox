import React, { useState } from 'react';
import { MenuItem } from '../types';
import { UtensilsCrossed, CheckCircle2 } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  const [imgError, setImgError