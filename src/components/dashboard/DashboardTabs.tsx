import React from 'react';

const tabs = [
    { key: 'wishlist', label: 'Wishlist' },
    { key: 'favorites', label: 'Favorites' },
    { key: 'orders', label: 'Orders' },
    { key: 'shipping', label: 'Shipping Details' },
];

const DashboardTabs = ({ activeTab, setActiveTab }) => (
    <div className="flex space-x-4 mb-8">
        {tabs.map(tab => (
            <button
                key={tab.key}
                className={`px-4 py-2 rounded ${activeTab === tab.key ? 'bg-primary text-dark' : 'bg-gray-800 text-light'}`}
                onClick={() => setActiveTab(tab.key)}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

export default DashboardTabs; 