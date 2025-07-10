// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const OrderConfirmationPage = () => {
//   const { id } = useParams(); // Get the Order ID from URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch the order details based on order ID
//   const fetchOrderDetails = async () => {
//     try {
//       const token = localStorage.getItem("token"); // 🔐 Get token from localStorage

//       // Fetch the order from the backend API
//       const { data } = await axios.get(`/api/orders/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Attach token to headers
//         },
//       });

//       setOrder(data); // Set the order data to state
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch order:", error);
//       setLoading(false);
//     }
//   };

//   // Utility to calculate estimated delivery date
//   const calculateEstimatedDelivery = (createdAt) => {
//     const orderDate = new Date(createdAt);
//     orderDate.setDate(orderDate.getDate() + 10); // Adding 10 days for estimated delivery
//     return orderDate.toLocaleDateString();
//   };

//   // Fetch order details when component mounts
//   useEffect(() => {
//     fetchOrderDetails();
//   }, [id]);

//   // Loading state
//   if (loading) return <div className="text-center py-10">Loading...</div>;

//   // Error state if no order found
//   if (!order) return <div className="text-center py-10">Order not found.</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
//       <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
//         Thank You For Your Order!
//       </h1>

//       <div className="p-6 rounded-lg border">
//         {/* Order Info */}
//         <div className="flex justify-between mb-20">
//           <div>
//             <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
//             <p className="text-gray-500">
//               Order date: {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//           <div>
//             <p className="text-emerald-700 text-sm">
//               Estimated Delivery: {calculateEstimatedDelivery(order.createdAt)}
//             </p>
//           </div>
//         </div>

//         {/* Ordered Items */}
//         <div className="mb-20">
//           <h4 className="font-semibold text-lg mb-4">Ordered Items:</h4>
//           {order.checkoutItems.map((item, index) => (
//             <div key={index} className="flex items-center mb-4">
//               <img
//                 src={item.img} // Placeholder for item image
//                 alt={item.name}
//                 className="h-16 w-16 object-cover rounded-md mr-4"
//               />
//               <div>
//                 <h4 className="text-md font-semibold">{item.name}</h4>
//                 <p className="text-sm text-gray-500">{item.color}</p>
//               </div>
//               <div className="ml-auto text-right">
//                 <p className="text-md">₹{item.price}</p>
//                 <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Payment & Delivery Info */}
//         <div className="grid grid-cols-2 gap-8">
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Payment</h4>
//             <p className="text-gray-600">{order.paymentMethod}</p>
//             <p className="text-gray-600">
//               {order.isPaid ? "Paid" : "Not Paid"}
//             </p>
//             <p className="text-gray-600">
//               Payment Status: {order.paymentStatus}
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Delivery</h4>
//             <p className="text-gray-600">{order.shippingAddress.address}</p>
//             <p className="text-gray-600">
//               {order.shippingAddress.city}, {order.shippingAddress.zip}
//             </p>
//             <p className="text-gray-600">
//               {order.shippingAddress.country}
//             </p>
//           </div>
//         </div>

//         {/* Additional Payment Details */}
//         <div className="mt-6">
//           <h4 className="text-lg font-semibold">Payment Details:</h4>
//           <p>Transaction ID: {order.paymentDetails.transactionId}</p>
//           <p>Order ID (Razorpay): {order.paymentDetails.orderId}</p>
//           <p>Amount Paid: ₹{order.paymentDetails.amount}</p>
//           <p>Currency: {order.paymentDetails.currency}</p>
//           <p>Status: {order.paymentDetails.status}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderConfirmationPage = () => {
  const { id } = useParams(); // Get the Order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the order details based on order ID
  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔐 Get token from localStorage

      // Fetch the order from the backend API
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token to headers
        },
      });

      setOrder(data); // Set the order data to state
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      setLoading(false);
    }
  };

  // Utility to calculate estimated delivery date
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Adding 10 days for estimated delivery
    return orderDate.toLocaleDateString();
  };

  // Fetch order details when component mounts
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  // Loading state
  if (loading) return <div className="text-center py-10">Loading...</div>;

  // Error state if no order found
  if (!order) return <div className="text-center py-10">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order!
      </h1>

      <div className="p-6 rounded-lg border">
        {/* Order Info */}
        <div className="flex justify-between mb-20">
          <div>
            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
            <p className="text-gray-500">
              Order date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-emerald-700 text-sm">
              Estimated Delivery: {calculateEstimatedDelivery(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Ordered Items (No Images) */}
        <div className="mb-20">
          <h4 className="font-semibold text-lg mb-4">Ordered Items:</h4>
          {order.checkoutItems.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              {/* Removed Image */}
              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.color}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md">₹{item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Delivery Info */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-600">{order.paymentMethod}</p>
            <p className="text-gray-600">
              {order.isPaid ? "Paid" : "Not Paid"}
            </p>
            <p className="text-gray-600">
              Payment Status: {order.paymentStatus}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.zip}
            </p>
            <p className="text-gray-600">
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Additional Payment Details */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Payment Details:</h4>
          <p>Transaction ID: {order.paymentDetails.transactionId}</p>
          <p>Order ID (Razorpay): {order.paymentDetails.orderId}</p>
          <p>Amount Paid: ₹{order.paymentDetails.amount}</p>
          <p>Currency: {order.paymentDetails.currency}</p>
          <p>Status: {order.paymentDetails.status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
