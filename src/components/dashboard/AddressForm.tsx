import React, { useState, useEffect } from 'react';

interface AddressFormProps {
    onSubmit: (addressData: any) => void; // Function to call on form submission
    onCancel: () => void; // Function to call on cancel
    initialData?: any; // Optional initial data for editing
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [address, setAddress] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        is_default: false,
    });

    useEffect(() => {
        if (initialData) {
            setAddress(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(address);
    };

    return (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-lg font-display mb-4">{initialData ? 'Edit Address' : 'Add New Address'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="address_line1" className="block text-gray-400 mb-1">Address Line 1</label>
                    <input type="text" id="address_line1" name="address_line1" value={address.address_line1} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" />
                </div>
                <div>
                    <label htmlFor="address_line2" className="block text-gray-400 mb-1">Address Line 2 (Optional)</label>
                    <input type="text" id="address_line2" name="address_line2" value={address.address_line2} onChange={handleChange} className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-gray-400 mb-1">City</label>
                        <input type="text" id="city" name="city" value={address.city} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-gray-400 mb-1">State/Province</label>
                        <input type="text" id="state" name="state" value={address.state} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" />
                    </div>
                    <div>
                        <label htmlFor="zip_code" className="block text-gray-400 mb-1">Zip/Postal Code</label>
                        <input type="text" id="zip_code" name="zip_code" value={address.zip_code} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" />
                    </div>
                </div>
                <div>
                    <label htmlFor="country" className="block text-gray-400 mb-1">Country</label>
                    <input type="text" id="country" name="country" value={address.country} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="is_default" name="is_default" checked={address.is_default} onChange={handleChange} className="mr-2" />
                    <label htmlFor="is_default" className="text-gray-400">Set as default address</label>
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="bg-primary text-dark px-4 py-2 rounded hover:bg-accent">Save Address</button>
                    <button type="button" onClick={onCancel} className="bg-gray-600 text-light px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm; 