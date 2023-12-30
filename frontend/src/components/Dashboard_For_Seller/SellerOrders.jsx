import React, { useEffect, useState } from 'react';
import axios from 'axios';
import server from '../../utils/server';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' by default

  useEffect(() => {
    // Fetch orders data from your backend API
    axios
      .get(`${server}/api/seller-order-history/`)
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  const confirmOrder = (orderId) => {
    // Implement the logic to confirm the order on the backend
    // You can use axios.post or another suitable method

    axios
      .post(`${server}/api/confirm-order/${orderId}/`)
      .then((res) => {
        console.log('Order confirmed successfully:', res.data);
        // Update the order status locally
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, status: 'confirmed' } : order
        );
        setOrders(updatedOrders);
        // Update the filtered orders if a filter is applied
        const updatedFilteredOrders = filteredOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'confirmed' } : order
        );
        setFilteredOrders(updatedFilteredOrders);
      })
      .catch((error) => {
        console.error('Error confirming order:', error);
      });
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === 'all') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      

      <div className="flex justify-center mb-4">
        <button
          className={`mx-2 px-4 py-2 rounded ${
            filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleFilter('all')}
        >
          All
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            filterStatus === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            filterStatus === 'confirmed' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => handleFilter('confirmed')}
        >
          Confirmed
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredOrders.map((order) => (
    <div
      key={order.id}
      className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
        <p>Customer: {order.user.email}</p>
        <p>Product: {order.product.product_name}</p>
        <p>Total Cost: Rs {order.total_cost}</p>
        <p>Purchase Date: {new Date(order.purchase_date).toLocaleDateString()}</p>
        <p>Shipping Address : {order.shipping_address}</p>
      </div>

      {/* Render Confirm Order button or Shipping Status based on order status */}
      <div className="p-4 flex justify-between items-center">
        {order.status === 'pending' && (
          <button
            onClick={() => confirmOrder(order.id)}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
          >
            Confirm Order
          </button>
        )}
        {order.status === 'confirmed' && (
          <p className="text-blue-500 font-semibold">Shipping Status: Shipped</p>
        )}
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
}

export default SellerOrders;
