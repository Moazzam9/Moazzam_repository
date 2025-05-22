import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'sneakers' | 'watches';
  price: number;
  originalPrice: number;
  condition: 'new' | 'like new' | 'excellent' | 'good' | 'fair';
  size: string | string[];
  images: string[];
  description: string;
  authenticated: boolean;
  featured?: boolean;
  createdAt?: Timestamp;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface WishlistItem {
  product: Product;
}