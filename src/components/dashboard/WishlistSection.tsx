import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import ProductCard from '../common/ProductCard';

const WishlistSection = () => {
    const [wishlist, setWishlist] = useState([]);
    const user = getAuth().currentUser;

    useEffect(() => {
        if (!user) return;
        const db = getDatabase();
        const wishlistRef = ref(db, `wishlist/${user.uid}`);
        const unsubscribe = onValue(wishlistRef, snapshot => {
            const data = snapshot.val() || {};
            const items = Object.values(data);
            setWishlist(items);
        });
        return () => unsubscribe();
    }, [user]);

    const handleRemove = (productId) => {
        const db = getDatabase();
        remove(ref(db, `wishlist/${user.uid}/${productId}`));
    };

    // TODO: Implement move to cart and view details

    return (
        <div>
            <h2 className="text-xl font-display mb-4">Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="text-gray-400">No items in wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                        <div key={item.id}>
                            <ProductCard product={item} />
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                            {/* Add Move to Cart and View Details buttons */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistSection; 