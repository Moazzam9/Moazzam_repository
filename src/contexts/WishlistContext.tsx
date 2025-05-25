import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';
import { useAuth } from './AuthContext';
import { Product, WishlistItem } from '../types';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: async () => { },
  removeFromWishlist: async () => { },
  isInWishlist: () => false,
  clearWishlist: async () => { },
  loading: true,
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const db = getDatabase();
    let wishlistRef;

    if (!currentUser) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    wishlistRef = ref(db, `wishlist/${currentUser.uid}`);
    const unsubscribe = onValue(wishlistRef, (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.values(data);
      setWishlistItems(items as Product[]);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching wishlist:", error);
      setLoading(false);
    });

    return () => {
      if (wishlistRef) {
        off(wishlistRef, 'value', unsubscribe);
      }
    };
  }, [currentUser]);

  const addToWishlist = async (product: Product) => {
    if (!currentUser) {
      console.warn("User not logged in. Cannot add to wishlist.");
      return;
    }
    const db = getDatabase();
    await set(ref(db, `wishlist/${currentUser.uid}/${product.id}`), product);
  };

  const removeFromWishlist = async (productId: string) => {
    if (!currentUser) {
      console.warn("User not logged in. Cannot remove from wishlist.");
      return;
    }
    const db = getDatabase();
    await remove(ref(db, `wishlist/${currentUser.uid}/${productId}`));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (!currentUser) {
      console.warn("User not logged in. Cannot clear wishlist.");
      return;
    }
    const db = getDatabase();
    await remove(ref(db, `wishlist/${currentUser.uid}`));
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    loading,
  };

  return (
    <WishlistContext.Provider value={value}>
      {!loading && children}
    </WishlistContext.Provider>
  );
};