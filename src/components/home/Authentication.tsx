import React from 'react';
import { Shield, Check } from 'lucide-react';

const Authentication = () => {
  return (
    <section className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="flex items-center mb-4">
              <Shield className="text-primary mr-2" size={28} />
              <h2 className="font-display text-2xl md:text-3xl text-light">Authentication Guarantee</h2>
            </div>
            <p className="text-gray-300 mb-6">
              At LuxeFinds, we put authentication at the heart of everything we do. Every item on our platform undergoes a rigorous authentication process by our team of experts.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h3 className="text-light font-medium">Physical Inspection</h3>
                  <p className="text-gray-400 text-sm">Each item is physically inspected for quality, condition, and authenticity markers.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h3 className="text-light font-medium">Documentation Verification</h3>
                  <p className="text-gray-400 text-sm">We verify all accompanying documentation, receipts, and provenance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h3 className="text-light font-medium">Digital Authentication Certificate</h3>
                  <p className="text-gray-400 text-sm">Every product comes with a digital certificate of authenticity.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="text-primary mt-1 mr-3" size={20} />
                <div>
                  <h3 className="text-light font-medium">Money-Back Guarantee</h3>
                  <p className="text-gray-400 text-sm">If an item is proven to be inauthentic, we offer a full refund.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.pexels.com/photos/9800002/pexels-photo-9800002.jpeg" 
              alt="Authentication Process" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary p-4 rounded-lg shadow-lg">
              <div className="text-dark font-display font-bold text-xl">100%</div>
              <div className="text-dark text-sm">Authenticated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authentication;