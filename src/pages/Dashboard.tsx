import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Greeting from '../components/dashboard/Greeting';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import WishlistSection from '../components/dashboard/WishlistSection';
import FavoritesSection from '../components/dashboard/FavoritesSection';
import OrdersSection from '../components/dashboard/OrdersSection';
import ShippingSection from '../components/dashboard/ShippingSection';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('shipping');

    return (
        <div className="min-h-screen bg-dark text-light flex flex-col">
            <Header />
            <main className="container mx-auto py-12 flex-grow">
                <Greeting />
                <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'wishlist' && <WishlistSection />}
                {activeTab === 'favorites' && <FavoritesSection />}
                {activeTab === 'orders' && <OrdersSection />}
                {activeTab === 'shipping' && <ShippingSection />}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard; 