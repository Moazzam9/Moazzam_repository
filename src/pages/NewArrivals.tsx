import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const NewArrivals = () => {
    // Placeholder data for random expensive shoes
    const products = [
        {
            id: 1,
            name: 'Air Jordan 1 Retro High OG',
            price: '$1,500',
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/693f9b4d-95da-4df4-916e-f05c35c850d8/AIR+JORDAN+1+RETRO+HIGH+OG.png',
        },
        {
            id: 2,
            name: 'Nike SB Dunk Low',
            price: '$800',
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/NIKE+DUNK+LOW+RETRO.png',
        },
        {
            id: 3,
            name: 'Adidas Yeezy Boost 350 V2',
            price: '$600',
            imageUrl: 'https://via.placeholder.com/300x200?text=Yeezy',
        },
        {
            id: 4,
            name: 'Balenciaga Triple S',
            price: '$950',
            imageUrl: 'https://via.placeholder.com/300x200?text=Balenciaga',
        },
        {
            id: 5,
            name: 'Off-White x Nike Air Force 1',
            price: '$2,000',
            imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/odhlk8ksqmstmdcjjyn0/W+AF1+SHADOW.png',
        },
    ];

    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">New Arrivals</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-display text-light mb-1">{product.name}</h3>
                                <p className="text-primary font-bold">{product.price}</p>
                                {/* Add a button or link for viewing details or adding to cart/wishlist */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NewArrivals; 