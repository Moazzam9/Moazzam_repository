import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

const OrdersSection = () => {
    const [orders, setOrders] = useState([]);
    const user = getAuth().currentUser;

    useEffect(() => {
        if (!user) return;
        const db = getDatabase();
        const ordersRef = ref(db, `orders/${user.uid}`);
        const unsubscribe = onValue(ordersRef, snapshot => {
            const data = snapshot.val() || {};
            setOrders(Object.entries(data).map(([orderId, value]) => ({ orderId, ...value })));
        });
        return () => unsubscribe();
    }, [user]);

    const currentOrders = orders.filter(order => order.status !== 'Completed');
    const previousOrders = orders.filter(order => order.status === 'Completed');

    // TODO: Implement reorder, review, and track shipment actions

    return (
        <div>
            <h2 className="text-xl font-display mb-4">Your Orders</h2>
            <div className="mb-8">
                <h3 className="text-lg font-display mb-2">Current Orders</h3>
                {currentOrders.length === 0 ? (
                    <p className="text-gray-400">No current orders.</p>
                ) : (
                    <ul>
                        {currentOrders.map(order => (
                            <li key={order.orderId} className="mb-4 p-4 bg-gray-800 rounded">
                                <div>Order #{order.orderId} - {order.status}</div>
                                <div>Date: {order.order_date}</div>
                                <div>Total: ${order.total_price}</div>
                                {/* Add Track Shipment button */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h3 className="text-lg font-display mb-2">Previous Orders</h3>
                {previousOrders.length === 0 ? (
                    <p className="text-gray-400">No previous orders.</p>
                ) : (
                    <ul>
                        {previousOrders.map(order => (
                            <li key={order.orderId} className="mb-4 p-4 bg-gray-800 rounded">
                                <div>Order #{order.orderId} - {order.status}</div>
                                <div>Date: {order.order_date}</div>
                                <div>Total: ${order.total_price}</div>
                                {/* Add Reorder and Review buttons */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrdersSection; 