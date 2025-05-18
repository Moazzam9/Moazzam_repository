import React from 'react';
import { Link } from '../common/Link';

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl text-light text-center mb-12">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-lg h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10"></div>
            <img 
              src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" 
              alt="Sneakers" 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="font-display text-xl text-light mb-2">Luxury Sneakers</h3>
              <p className="text-gray-300 mb-4">Limited edition and rare finds from top brands</p>
              <Link 
                to="/sneakers" 
                className="inline-block py-2 px-4 bg-primary text-dark font-medium rounded hover:bg-accent transition-colors"
              >
                Shop Collection
              </Link>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-lg h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10"></div>
            <img 
              src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" 
              alt="Watches" 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="font-display text-xl text-light mb-2">Luxury Watches</h3>
              <p className="text-gray-300 mb-4">Authenticated timepieces from prestigious brands</p>
              <Link 
                to="/watches" 
                className="inline-block py-2 px-4 bg-primary text-dark font-medium rounded hover:bg-accent transition-colors"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;