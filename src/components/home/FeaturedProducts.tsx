import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { Product } from '../../types';
import { Link } from '../common/Link';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  category?: 'sneakers' | 'watches';
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products, category }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach(child => {
        observer.observe(child);
      });
    }

    return () => {
      if (children) {
        Array.from(children).forEach(child => {
          observer.unobserve(child);
        });
      }
    };
  }, [products]);

  return (
    <section className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl text-light">{title}</h2>
          {category && (
            <Link
              to={`/${category}`}
              className="text-primary flex items-center hover:text-accent transition-colors"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          )}
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <div key={product.id} className="opacity-0 transform translate-y-8 transition-all duration-700">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;