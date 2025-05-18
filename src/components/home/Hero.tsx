import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { Link } from '../common/Link';

const Hero = () => {
  return (
    <div className="relative bg-dark min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark z-10"></div>
        <img 
          src="https://images.pexels.com/photos/1212129/pexels-photo-1212129.jpeg" 
          alt="Luxury Watch" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20 pt-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-light mb-4 leading-tight">
            Authentic Luxury <span className="text-primary">Within Reach</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            Discover authenticated pre-owned luxury sneakers and watches at prices that make sense. 
            Every item certified for authenticity and quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/sneakers">
              <Button size="lg" icon={<ChevronRight size={18} />}>
                Shop Sneakers
              </Button>
            </Link>
            <Link to="/watches">
              <Button size="lg" variant="outline" icon={<ChevronRight size={18} />}>
                Shop Watches
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-6">
            <div className="text-center">
              <div className="font-display text-primary text-xl font-bold">100%</div>
              <div className="text-light text-sm mt-1">Authentic</div>
            </div>
            
            <div className="h-10 w-px bg-gray-700"></div>
            
            <div className="text-center">
              <div className="font-display text-primary text-xl font-bold">30+</div>
              <div className="text-light text-sm mt-1">Top Brands</div>
            </div>
            
            <div className="h-10 w-px bg-gray-700"></div>
            
            <div className="text-center">
              <div className="font-display text-primary text-xl font-bold">14 Days</div>
              <div className="text-light text-sm mt-1">Returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;