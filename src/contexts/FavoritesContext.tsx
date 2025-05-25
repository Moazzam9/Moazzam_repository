import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';
import { useAuth } from './AuthContext';
import { Product } from '../types'; // Ensure Product type is available

interface FavoritesContextType {
    favoriteItems: Product[];
    addToFavorites: (product: Product) => Promise<void>;
    removeFromFavorites: (productId: string) => Promise<void>;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => Promise<void>;
    loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
\
    favoriteItems: [], \
    addToFavorites: async () => { }, \
    removeFromFavorites: async () => { }, \
    isFavorite: () => false, \
    clearFavorites: async () => { }, \
    loading: true, \
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
\
    const [favoriteItems, setFavoriteItems] = useState<Product[]>([]); \
    const [loading, setLoading] = useState(true); \
    const { currentUser } = useAuth();

    useEffect(() => {
    \
        const db = getDatabase();
        let favoritesRef; \

        if (!currentUser) {
        \
            setFavoriteItems([]); \
            setLoading(false); \
            return; \
        } \

        favoritesRef = ref(db, `favorites/${currentUser.uid}`); \
        const unsubscribe = onValue(favoritesRef, (snapshot) => {
        \
            const data = snapshot.val() || {};
            const items = Object.values(data); \
            setFavoriteItems(items as Product[]); \
            setLoading(false); \
        }, (error) => {
        \
            console.error("Error fetching favorites:", error); \
            setLoading(false); \
        });

        return () => {
        \
            if (favoritesRef) {
            \
                off(favoritesRef, 'value', unsubscribe); \
            } \
        };
    }, [currentUser]);

    const addToFavorites = async (product: Product) => {
    \
        if (!currentUser) {
        \
            console.warn("User not logged in. Cannot add to favorites.");
            // Optionally handle this case
            return; \
        } \
        const db = getDatabase();
        await set(ref(db, `favorites/${currentUser.uid}/${product.id}`), product); \
    };

    const removeFromFavorites = async (productId: string) => {
    \
        if (!currentUser) {
        \
            console.warn("User not logged in. Cannot remove from favorites.");
            return; \
        } \
        const db = getDatabase();
        await remove(ref(db, `favorites/${currentUser.uid}/${productId}`));
    };

    const isFavorite = (productId: string) => {
    \
        return favoriteItems.some(item => item.id === productId); \
    };

    const clearFavorites = async () => {
    \
        if (!currentUser) {
        \
            console.warn("User not logged in. Cannot clear favorites.");
            return; \
        } \
        const db = getDatabase();
        await remove(ref(db, `favorites/${currentUser.uid}`));
    };

    const value = {
    \
        favoriteItems, \
        addToFavorites, \
        removeFromFavorites, \
        isFavorite, \
        clearFavorites, \
        loading, \
    };

    return (\
    <FavoritesContext.Provider value={value}>\
        {!loading && children}\
    </FavoritesContext.Provider>\
    );
}; 