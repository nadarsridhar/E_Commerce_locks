// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     pincode: "",
//     country: "",
//     phone: "",
//   });

//   const [cart, setCart] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     let guestId = localStorage.getItem("guestId");
//     if (!guestId) {
//       guestId = `guest_${Date.now()}`;
//       localStorage.setItem("guestId", guestId);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchUserAndCart = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         let currentUserId = null;

//         if (token) {
//           const userResponse = await axios.get("/api/users/profile", {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           });

//           const user = userResponse.data;
//           currentUserId = user._id;
//           setUserId(currentUserId);

//           const nameParts = user.name ? user.name.split(" ") : ["", ""];
//           setFormData((prev) => ({
//             ...prev,
//             firstName: nameParts[0],
//             lastName: nameParts[1],
//             phone: user.mobile || "",
//           }));
//         } else {
//           currentUserId = localStorage.getItem("guestId");
//         }

//         const cartResponse = await axios.get(`/api/cart?userId=${currentUserId}`, {
//           headers: { Authorization: token ? `Bearer ${token}` : "" },
//           withCredentials: true,
//         });

//         setCart(cartResponse.data.products);
//         setTotal(cartResponse.data.totalPrice);
//       } catch (error) {
//         console.error("Error fetching data:", error.response?.data || error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAndCart();
//   }, []);
  
//   const handlePayment = async () => {
//     try {
//       const payload = {
//         amount: total,
//         currency: "INR",
//         userId,
//         checkoutItems: cart.map(item => ({
//           productId: item._id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity
//         })),
//         shippingAddress: {
//           address: formData.address,
//           city: formData.city,
//           postalCode: formData.pincode,
//           country: formData.country,
//         },
//         paymentMethod: "Razorpay",
//         totalPrice: total,
//       };
  
//       const { data: orderData } = await axios.post("/api/payments/create-order", payload);
//       const { data: keyData } = await axios.get("/api/payments/razorpay-key");
  
//       const options = {
//         key: keyData.key,
//         amount: orderData.order.amount,
//         currency: orderData.order.currency,
//         name: "Your Store",
//         description: "Order Payment",
//         order_id: orderData.order.id,
//         handler: async function (response) {
//           try {
//             const verifyRes = await axios.post("/api/payments/verify-payment", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });
  
//             if (verifyRes.data.success) {
//               alert("Payment successful!");
//               console.log(verifyRes);
//               navigate(`/order-confirmation/${verifyRes.data.order_id}`);
//             } else {
//               alert("Payment verification failed!");
//             }
//           } catch (err) {
//             console.error("Verification error:", err);
//             alert("Payment verification failed!");
//           }
//         },
//         prefill: {
//           name: formData.firstName + " " + formData.lastName,
//           email: "example@example.com", // optionally add this to form
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" },
//       };
  
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment initiation failed");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">CHECKOUT</h2>
//       {loading ? (
//         <p>Loading checkout details...</p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <h3 className="text-lg font-medium">Delivery</h3>
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="text"
//               name="pincode"
//               placeholder="Pincode"
//               value={formData.pincode}
//               onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="w-full p-2 border rounded mt-2"
//             />
//           </div>
//           <div className="bg-gray-100 p-4 rounded">
//             <h3 className="text-lg font-medium">Order Summary</h3>
//             {cart.length > 0 ? (
//               cart.map((item, index) => (
//                 <div key={index} className="flex justify-between border-b py-2">
//                   <span>
//                     {item.name} (x{item.quantity})
//                   </span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))
//             ) : (
//               <p>No items in cart</p>
//             )}
//             <div className="mt-2 font-bold text-lg">Total: ₹{total}</div>
//           </div>
//         </div>
//       )}
//       <button
//         onClick={handlePayment}
//         className={`w-full text-white p-2 rounded mt-4 ${formData.address ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
//         disabled={!formData.address}
//       >
//         Pay with Razorpay
//       </button>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", guestId);
    }
  }, []);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const token = localStorage.getItem("token");
        let currentUserId = null;

        if (token) {
          const userResponse = await axios.get("/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });

          const user = userResponse.data;
          currentUserId = user._id;
          setUserId(currentUserId);

          const nameParts = user.name ? user.name.split(" ") : ["", ""];
          setFormData((prev) => ({
            ...prev,
            firstName: nameParts[0],
            lastName: nameParts[1],
            phone: user.mobile || "",
          }));
        } else {
          currentUserId = localStorage.getItem("guestId");
        }

        const cartResponse = await axios.get(`/api/cart?userId=${currentUserId}`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
          withCredentials: true,
        });

        setCart(cartResponse.data.products);
        setTotal(cartResponse.data.totalPrice);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCart();
  }, []);
  
  const handlePayment = async () => {
    try {
      const payload = {
        amount: total,
        currency: "INR",
        userId,
        checkoutItems: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.pincode,
          country: formData.country,
        },
        paymentMethod: "Razorpay",
        totalPrice: total,
      };
  
      const { data: orderData } = await axios.post("/api/payments/create-order", payload);
      const { data: keyData } = await axios.get("/api/payments/razorpay-key");
  
      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Your Store",
        description: "Order Payment",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("/api/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            if (verifyRes.data.success) {
              alert("Payment successful!");
              console.log(verifyRes);
              navigate(`/order-confirmation/${verifyRes.data.order_id}`);
            } else {
              alert("Payment verification failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: formData.firstName + " " + formData.lastName,
          email: "example@example.com", // optionally add this to form
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">CHECKOUT</h2>
      {loading ? (
        <p>Loading checkout details...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">Delivery</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            {/* <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            /> */}
            <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                setFormData({ ...formData, pincode: val });
              }
            }}
            className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-medium">Order Summary</h3>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b py-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
            <div className="mt-2 font-bold text-lg">Total: ₹{total}</div>
          </div>
        </div>
      )}
      <button
        onClick={handlePayment}
        className={`w-full text-white p-2 rounded mt-4 ${formData.address ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
        disabled={!formData.address}
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Checkout;
