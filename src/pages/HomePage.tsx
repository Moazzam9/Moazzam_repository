import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Authentication from '../components/home/Authentication';
import Testimonials from '../components/home/Testimonials';
import { Product } from '../types';
import { productService } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [sneakers, setSneakers] = useState<Product[]>([]);
  const [watches, setWatches] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const getMillis = (createdAt) => {
    if (!createdAt) return 0;
    if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
    if (typeof createdAt === 'string') return new Date(createdAt).getTime();
    if (createdAt instanceof Date) return createdAt.getTime();
    return 0;
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all products in parallel
      const [featured, sneakersList, watchesList] = await Promise.all([
        productService.getFeaturedProducts(),
        productService.getProductsByCategory('sneakers'),
        productService.getProductsByCategory('watches')
      ]);

      setFeaturedProducts(featured);
      setSneakers(sneakersList);
      setWatches(watchesList);

      // Get newest products from all categories
      const allProducts = [...sneakersList, ...watchesList]
        .sort((a, b) => getMillis(b.createdAt) - getMillis(a.createdAt))
        .slice(0, 4);
      setNewArrivals(allProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-dark text-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark text-light min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={loadProducts}
            className="mt-4 px-4 py-2 bg-primary text-dark rounded hover:bg-accent transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts title="New Arrivals" products={newArrivals} />
      <FeaturedProducts title="Featured Products" products={featuredProducts} />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-display text-light mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer group relative"
            onClick={() => navigate('/category/sneakers')}
          >
            <img
              src="https://images.pexels.com/photos/19090/pexels-photo.jpg"
              alt="Luxury Sneakers"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-display text-light mb-2">Luxury Sneakers</h3>
              <p className="text-gray-300 mb-4">Limited edition and rare finds from top brands</p>
              <button className="bg-primary text-dark px-6 py-2 rounded font-medium">Shop Collection</button>
            </div>
          </div>
          <div
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer group relative"
            onClick={() => navigate('/category/watches')}
          >
            <img
              src="https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg"
              alt="Luxury Watches"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-display text-light mb-2">Luxury Watches</h3>
              <p className="text-gray-300 mb-4">Authenticated timepieces from prestigious brands</p>
              <button className="bg-primary text-dark px-6 py-2 rounded font-medium">Shop Collection</button>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts title="Popular Sneakers" products={sneakers} category="sneakers" />
      <Authentication />
      <FeaturedProducts title="Luxury Watches" products={watches} category="watches" />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;