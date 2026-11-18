import { MenuItem, Category, DietaryTag, FilterState } from '../types';

const API_BASE = '/api/v1';

// Mock initial data for standalone and offline resilience
let mockCategories: Category[] = [
  { id: 'cat-1', name: 'Starters', sort_order: 1 },
  { id: 'cat-2', name: 'Mains', sort_order: 2 },
  { id: 'cat-3', name: 'Desserts', sort_order: 3 },
  { id: 'cat-4', name: 'Beverages', sort_order: 4 },
];

let mockItems: MenuItem[] = [
  {
    id: 'item-1',
    category_id: 'cat-1',
    name: 'Avocado Toast',
    description: 'Sourdough bread topped with smashed avocado, cherry tomatoes, and microgreens.',
    price: 12.50,
    image_url: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&auto=format&fit=crop',
    is_available: true,
    category: mockCategories[0],
    tags: ['Vegan', 'Vegetarian']
  },
  {
    id: 'item-2',
    category_id: 'cat-2',
    name: 'Margherita Pizza',
    description: 'Classic wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil.',
    price: 16.00,
    image_url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop',
    is_available: true,
    category: mockCategories[1],
    tags: ['Vegetarian']
  },
  {
    id: 'item-3',
    category_id: 'cat-2',
    name: 'Truffle Pasta',
    description: 'Fresh homemade tagliatelle tossed in a rich black truffle and parmesan cream sauce.',
    price: 24.50,
    image_url: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&auto=format&fit=crop',
    is_available: false,
    category: mockCategories[1],
    tags: ['Vegetarian', 'Spicy']
  },
  {
    id: 'item-4',
    category_id: 'cat-3',
    name: 'Molten Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center, served with vanilla bean gelato.',
    price: 9.50,
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop',
    is_available: true,
    category: mockCategories[2],
    tags: ['Vegetarian']
  },
  {
    id: 'item-5',
    category_id: 'cat-4',
    name: 'Artisan Lemonade',
    description: 'Freshly squeezed Sicilian lemons with organic agave syrup and fresh mint leaves.',
    price: 5.00,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop',
    is_available: true,
    category: mockCategories[3],
    tags: ['Vegan', 'Gluten-Free']
  }
];

export const apiClient = {
  async getMenu(filters?: FilterState): Promise<MenuItem[]> {
    try {
      const res = await fetch(`${API_BASE}/menu`);
      if (!res.ok) throw new Error('API unreachable');
      const json = await res.json();
      return json.data || mockItems;
    } catch {
      // Fallback to in-memory mock data with client filtering
      let items = [...mockItems];
      if (filters) {
        if (filters.search) {
          const q = filters.search.toLowerCase();
          items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
        }
        if (filters.categoryId) {
          items = items.filter(i => i.category_id === filters.categoryId);
        }
        if (filters.dietaryTags && filters.dietaryTags.length > 0) {
          items = items.filter(i => i.tags && filters.dietaryTags.every(t => i.tags?.includes(t)));
        }
      }
      return items;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('API unreachable');
      const json = await res.json();
      return json.data || mockCategories;
    } catch {
      return mockCategories;
    }
  },

  async login(email: string