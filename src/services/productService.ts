import { rtdb } from '../config/firebase';
import { ref, push, get, set, remove, update } from 'firebase/database';
import { Product } from '../types';

const PRODUCTS_PATH = 'products';

// Helper function to convert fetched data to Product type with correct number types
const formatProductData = (data: any): Product => {
    return {
        ...data,
        price: parseFloat(data.price) || 0, // Ensure price is a number
        originalPrice: parseFloat(data.originalPrice) || 0, // Ensure originalPrice is a number
        // Ensure images is an array of strings
        images: Array.isArray(data.images) ? data.images : (typeof data.images === 'string' ? data.images.split(',').map((url: string) => url.trim()).filter((url: string) => url !== '') : []),
    };
};

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

        const products: Product[] = Object.values(data).map((item: any) => formatProductData(item));

        // Sort by createdAt descending
        return products.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
    },

    // Get products by category
    async getProductsByCategory(category: 'sneakers' | 'watches'): Promise<Product[]> {
        const snapshot = await get(ref(rtdb, PRODUCTS_PATH));
        const data = snapshot.val();
        if (!data) return [];

        const products: Product[] = Object.values(data)
            .filter((p: any) => p.category === category)
            .map((item: any) => formatProductData(item));

        // Sort by createdAt descending
        return products.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
    },

    // Get featured products
    async getFeaturedProducts(): Promise<Product[]> {
        const snapshot = await get(ref(rtdb, PRODUCTS_PATH));
        const data = snapshot.val();
        if (!data) return [];

        const products: Product[] = Object.values(data)
            .filter((p: any) => p.featured)
            .map((item: any) => formatProductData(item));

        // Sort by createdAt descending
        return products.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
    },

    // Get a product by ID
    async getProductById(id: string): Promise<Product | null> {
        const snapshot = await get(ref(rtdb, `${PRODUCTS_PATH}/${id}`));
        const data = snapshot.val();
        return data ? formatProductData(data) : null;
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