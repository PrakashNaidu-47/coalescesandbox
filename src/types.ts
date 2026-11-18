export interface Category {
  id: string;
  name: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  is_deleted?: boolean;
  category?: Category;
  tags: string[];
  allergens?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DietaryTag {
  id: string;
  name: string;
}

export interface FilterState {
  search: string;
  categoryId?: string;
  dietaryTags: string[];
  priceRange?: [number, number];
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'ADMIN';
}