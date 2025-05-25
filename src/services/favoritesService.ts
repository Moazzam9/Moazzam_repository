import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';
import { Product } from '../types';

const db = getDatabase();

export const favoritesService = {
    // Add a product to the user's favorites
    async addProduct(userId: string, product: Product): Promise<void> {
        if (!userId) {
            console.error("User ID is required to add product to favorites.");
            return;
        }
        await set(ref(db, `favorites/${userId}/${product.id}`), product);
    },

    // Remove a product from the user's favorites
    async removeProduct(userId: string, productId: string): Promise<void> {
        if (!userId || !productId) {
            console.error("User ID and Product ID are required to remove product from favorites.");
            return;
        }
        await remove(ref(db, `favorites/${userId}/${productId}`));
    },

    // Get a real-time stream of the user's favorites
    onFavoritesChange(userId: string, callback: (products: Product[]) => void): () => void {
        if (!userId) {
            console.error("User ID is required to listen for favorites changes.");
            return () => { }; // Return an empty unsubscribe function
        }
        const favoritesRef = ref(db, `favorites/${userId}`);
        const unsubscribe = onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val() || {};
            const items = Object.values(data);
            callback(items as Product[]);
        }, (error) => {
            console.error("Error fetching favorites:", error);
            callback([]); // Return empty array on error
        });
        return () => off(favoritesRef, 'value', unsubscribe);
    },

    // Get current favorites data (once)
    async getFavorites(userId: string): Promise<Product[]> {
        if (!userId) {
            console.error("User ID is required to get favorites.");
            return [];
        }
        const snapshot = await get(ref(db, `favorites/${userId}`));
        const data = snapshot.val() || {};
        return Object.values(data) as Product[];
    },

    // Clear the user's entire favorites
    async clearFavorites(userId: string): Promise<void> {
        if (!userId) {
            console.error("User ID is required to clear favorites.");
            return;
        }
        await remove(ref(db, `favorites/${userId}`));
    }
}; 