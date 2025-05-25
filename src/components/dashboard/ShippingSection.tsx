import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, remove, set, push } from 'firebase/database';
import AddressForm from './AddressForm';

const ShippingSection = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const user = getAuth().currentUser;

    useEffect(() => {
        if (!user) return;
        const db = getDatabase();
        const addressesRef = ref(db, `shippingAddresses/${user.uid}`);
        const unsubscribe = onValue(addressesRef, snapshot => {
            const data = snapshot.val() || {};
            setAddresses(Object.entries(data).map(([addressId, value]) => ({ addressId, ...value })));
        });
        return () => unsubscribe();
    }, [user]);

    const handleSaveAddress = async (addressData) => {
        if (!user) {
            console.warn("User not logged in. Cannot save address.");
            return;
        }
        const db = getDatabase();

        if (addressData.is_default) {
            const currentDefault = addresses.find(addr => addr.is_default);
            if (currentDefault && (editingAddress ? currentDefault.addressId !== editingAddress.addressId : true)) {
                await set(ref(db, `shippingAddresses/${user.uid}/${currentDefault.addressId}/is_default`), false);
            }
        }

        if (editingAddress) {
            await set(ref(db, `shippingAddresses/${user.uid}/${editingAddress.addressId}`), addressData);
            setEditingAddress(null);
        } else {
            const newAddressRef = push(ref(db, `shippingAddresses/${user.uid}`));
            await set(newAddressRef, addressData);
        }
        setShowForm(false);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleDeleteAddress = async (addressId) => {
        if (!user) {
            console.warn("User not logged in. Cannot delete address.");
            return;
        }
        const db = getDatabase();
        await remove(ref(db, `shippingAddresses/${user.uid}/${addressId}`));
    };

    const handleSetDefault = async (addressId) => {
        if (!user) {
            console.warn("User not logged in. Cannot set default address.");
            return;
        }
        const db = getDatabase();
        const currentDefault = addresses.find(addr => addr.is_default);
        if (currentDefault && currentDefault.addressId !== addressId) {
            await set(ref(db, `shippingAddresses/${user.uid}/${currentDefault.addressId}/is_default`), false);
        }
        await set(ref(db, `shippingAddresses/${user.uid}/${addressId}/is_default`), true);
    };

    return (
        <div>
            <h2 className="text-xl font-display mb-4">Shipping Addresses</h2>

            {!showForm && (
                <>
                    <button
                        onClick={() => { setShowForm(true); setEditingAddress(null); }}
                        className="bg-primary text-dark px-4 py-2 rounded hover:bg-accent mb-4"
                    >
                        Add New Address
                    </button>

                    {addresses.length === 0 ? (
                        <p className="text-gray-400">No shipping addresses.</p>
                    ) : (
                        <ul>
                            {addresses.map(address => (
                                <li key={address.addressId} className="mb-4 p-4 bg-gray-800 rounded">
                                    <div>{address.address_line1}, {address.address_line2 && `${address.address_line2}, `}{address.city}, {address.state}, {address.zip_code}, {address.country}</div>
                                    {address.is_default && <span className="text-primary ml-2">(Default)</span>}
                                    <div className="mt-2 space-x-2">
                                        <button onClick={() => handleEditAddress(address)} className="text-primary hover:text-accent text-sm">Edit</button>
                                        <button onClick={() => handleDeleteAddress(address.addressId)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                                        {!address.is_default && (
                                            <button onClick={() => handleSetDefault(address.addressId)} className="text-gray-400 hover:text-light text-sm">Set as Default</button>
                                        )}
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    )}
                </>
            )}

            {showForm && (
                <AddressForm
                    onSubmit={handleSaveAddress}
                    onCancel={() => { setShowForm(false); setEditingAddress(null); }}
                    initialData={editingAddress}
                />
            )}
        </div>
    );
};

export default ShippingSection; 