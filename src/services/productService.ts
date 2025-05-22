import { rtdb } from '../config/firebase';
import { ref, push, get, set, remove, update } from 'firebase/database';
import { Product } from '../types';

const PRODUCTS_PATH = 'products';

export const productService = {
    // Add a new product
    async addProduct(product: Omit<Product, 'id'>): Promise<string> {
        const newProductRef = push(ref(rtdb, PRODUCTS_PATH));
        const id = newProductRef.key!;
        await set(newProductRef, { ...product, id, createdAt: Date.now() });
        return id;
    },

    // Get all products
    async getAllProducts(): Promise<Product[]> {
        const snapshot = await get(ref(rtdb, PRODUCTS_PATH));
        const data = snapshot.val();
        if (!data) return [];
        // Sort by createdAt descending
        return Object.values(data).sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0)) as Product[];
    },

    // Get products by category
    async getProductsByCategory(category: 'sneakers' | 'watches'): Promise<Product[]> {
        const snapshot = await get(ref(rtdb, PRODUCTS_PATH));
        const data = snapshot.val();
        if (!data) return [];
        return Object.values(data)
            .filter((p: any) => p.category === category)
            .sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0)) as Product[];
    },

    // Get featured products
    async getFeaturedProducts(): Promise<Product[]> {
        const snapshot = await get(ref(rtdb, PRODUCTS_PATH));
        const data = snapshot.val();
        if (!data) return [];
        return Object.values(data)
            .filter((p: any) => p.featured)
            .sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0)) as Product[];
    },

    // Get a product by ID
    async getProductById(id: string): Promise<Product | null> {
        const snapshot = await get(ref(rtdb, `${PRODUCTS_PATH}/${id}`));
        const data = snapshot.val();
        return data ? data as Product : null;
    },

    // Delete a product
    async deleteProduct(id: string): Promise<void> {
        await remove(ref(rtdb, `${PRODUCTS_PATH}/${id}`));
    },

    // Update a product
    async updateProduct(id: string, product: Partial<Product>): Promise<void> {
        await update(ref(rtdb, `${PRODUCTS_PATH}/${id}`), product);
    }
}; 