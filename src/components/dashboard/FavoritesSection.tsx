import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import ProductCard from '../common/ProductCard';

const FavoritesSection = () => {
    const [favorites, setFavorites] = useState([]);
    const user = getAuth().currentUser;

    useEffect(() => {
        if (!user) return;
        const db = getDatabase();
        const favoritesRef = ref(db, `favorites/${user.uid}`);
        const unsubscribe = onValue(favoritesRef, snapshot => {
            const data = snapshot.val() || {};
            const items = Object.values(data);
            setFavorites(items);
        });
        return () => unsubscribe();
    }, [user]);

    // TODO: Implement quick view and reorder actions

    return (
        <div>
            <h2 className="text-xl font-display mb-4">Your Favorite Items</h2>
            {favorites.length === 0 ? (
                <p className="text-gray-400">No favorite items.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map(item => (
                        <div key={item.id}>
                            <ProductCard product={item} />
                            {/* Add Quick View and Reorder buttons */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesSection; 