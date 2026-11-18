export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  estimatedPickupTime: string;
}

export type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; code: string };

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}