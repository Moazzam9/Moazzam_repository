import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoriesSection from '../components/home/CategoriesSection';
import Authentication from '../components/home/Authentication';
import Testimonials from '../components/home/Testimonials';
import { Product } from '../types';
import { productService } from '../services/productService';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [sneakers, setSneakers] = useState<Product[]>([]);
  const [watches, setWatches] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

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
      <CategoriesSection />
      <FeaturedProducts title="Popular Sneakers" products={sneakers} category="sneakers" />
      <Authentication />
      <FeaturedProducts title="Luxury Watches" products={watches} category="watches" />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;