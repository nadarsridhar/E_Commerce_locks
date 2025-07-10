
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 🔐 Redirect to login if not logged in
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // 🔄 Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:9000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = '/login';
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">Failed to load profile.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section: Profile Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome, {user.name}</h1>
            <p className="text-lg text-gray-600 mb-4">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Right Section: Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border p-4 rounded-lg shadow-md bg-white"
                  >
                    <p><strong>Order ID:</strong> {order.paymentDetails?.orderId}</p>
                    <p><strong>Amount:</strong> ₹{(order.paymentDetails?.amount).toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.paymentDetails?.status}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
