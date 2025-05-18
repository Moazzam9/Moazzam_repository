import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'James Wilson',
    location: 'New York, NY',
    rating: 5,
    text: 'The authentication process gave me peace of mind when purchasing my pre-owned Rolex. The condition was exactly as described, and the entire experience exceeded my expectations.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    product: 'Rolex Submariner'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'I was hesitant to buy pre-owned sneakers online, but LuxeFinds made the process easy and secure. My Air Jordan 1s arrived in perfect condition with all the authentication documents.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    product: 'Air Jordan 1 Retro'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    location: 'Chicago, IL',
    rating: 4,
    text: 'Great selection of luxury watches at fair prices. The detailed photos and condition reports helped me make an informed decision. Will definitely shop here again.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    product: 'Omega Speedmaster'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl text-light text-center mb-12">Customer Stories</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-dark rounded-lg shadow-lg p-8">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex justify-center mb-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < currentTestimonial.rating ? "text-primary" : "text-gray-600"} 
                  fill={i < currentTestimonial.rating ? "currentColor" : "none"} 
                />
              ))}
            </div>
            
            <p className="text-gray-300 text-center mb-6 italic">"{currentTestimonial.text}"</p>
            
            <div className="text-center">
              <h4 className="font-display text-primary">{currentTestimonial.name}</h4>
              <p className="text-gray-400 text-sm">{currentTestimonial.location}</p>
              <p className="text-light text-sm mt-1">Purchased: {currentTestimonial.product}</p>
            </div>
            
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
              <button 
                onClick={prevTestimonial}
                className="bg-dark/80 text-light hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
              <button 
                onClick={nextTestimonial}
                className="bg-dark/80 text-light hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;