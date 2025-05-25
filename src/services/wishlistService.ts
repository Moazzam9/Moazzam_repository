import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';
import { Product } from '../types';

const db = getDatabase();

export const wishlistService = {
    // Add a product to the user's wishlist
    async addProduct(userId: string, product: Product): Promise<void> {
        if (!userId) {
            console.error("User ID is required to add product to wishlist.");
            return;
        }
        await set(ref(db, `wishlist/${userId}/${product.id}`), product);
    },

    // Remove a product from the user's wishlist
    async removeProduct(userId: string, productId: string): Promise<void> {
        if (!userId || !productId) {
            console.error("User ID and Product ID are required to remove product from wishlist.");
            return;
        }
        await remove(ref(db, `wishlist/${userId}/${productId}`));
    },

    // Get a real-time stream of the user's wishlist
    onWishlistChange(userId: string, callback: (products: Product[]) => void): () => void {
        if (!userId) {
            console.error("User ID is required to listen for wishlist changes.");
            return () => { }; // Return an empty unsubscribe function
        }
        const wishlistRef = ref(db, `wishlist/${userId}`);
        const unsubscribe = onValue(wishlistRef, (snapshot) => {
            const data = snapshot.val() || {};
            const items = Object.values(data);
            callback(items as Product[]);
        }, (error) => {
            console.error("Error fetching wishlist:", error);
            callback([]); // Return empty array on error
        });
        return () => off(wishlistRef, 'value', unsubscribe);
    },

    // Get current wishlist data (once)
    async getWishlist(userId: string): Promise<Product[]> {
        if (!userId) {
            console.error("User ID is required to get wishlist.");
            return [];
        }
        const snapshot = await get(ref(db, `wishlist/${userId}`));
        const data = snapshot.val() || {};
        return Object.values(data) as Product[];
    },

    // Clear the user's entire wishlist
    async clearWishlist(userId: string): Promise<void> {
        if (!userId) {
            console.error("User ID is required to clear wishlist.");
            return;
        }
        await remove(ref(db, `wishlist/${userId}`));
    }
}; 