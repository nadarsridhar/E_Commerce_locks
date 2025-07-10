// import React, { useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import CartContents from "../cart/CartContents";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
//   const navigate = useNavigate();
//   const API_URL = "http://localhost:9000/api/cart";
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     if (drawerOpen) {
//       fetchCart();
//     }
//   }, [drawerOpen]);

//   const fetchCart = async () => {
//     const guestId = localStorage.getItem("guestId");
//     const userId = localStorage.getItem("userId");

//     try {
//       console.log("📩 Fetching cart for:", userId ? `User ID: ${userId}` : `Guest ID: ${guestId}`);

//       const response = await axios.get(API_URL, {
//         params: userId ? { userId } : { guestId }
//       });

//       console.log("🛍️ Cart Response:", response.data);
//       setCartItems(response.data?.products || []);
//     } catch (error) {
//       console.error("❌ Error fetching cart:", error.response?.data || error);
//     }
//   };

//   const handleCheckout = () => {
//     const token = localStorage.getItem("token");

//     toggleCartDrawer(); // ✅ Close drawer first

//     setTimeout(() => {
//       if (!token) {
//         toast.warning("Please log in to proceed to checkout.");
//         navigate("/login", { state: { from: "/checkout" } });
//       } else {
//         navigate("/checkout");
//       }
//     }, 300);
//   };

//   return (
//     <>
//       <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white transform transition ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="p-4 flex justify-end">
//           <IoMdClose onClick={toggleCartDrawer} className="cursor-pointer text-xl" />
//         </div>
//         <h2 className="text-xl font-bold px-4">Your Cart</h2>
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500">Your cart is empty.</p>
//         ) : (
//           <CartContents cartItems={cartItems} fetchCart={fetchCart} />
//         )}
//         <div className="p-4">
//           <button onClick={handleCheckout} className="w-full bg-black text-white py-3">Checkout</button>
//         </div>
//       </div>

//       {/* 🔔 Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} />
//     </>
//   );
// };

// export default CartDrawer;
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartContents from "../cart/CartContents";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:9000/api/cart";
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (drawerOpen) {
      fetchCart();
    }
  }, [drawerOpen]);

  const fetchCart = async () => {
    const guestId = localStorage.getItem("guestId");
    const userId = localStorage.getItem("userId");

    try {
      console.log("📩 Fetching cart for:", userId ? `User ID: ${userId}` : `Guest ID: ${guestId}`);

      const response = await axios.get(API_URL, {
        params: userId ? { userId } : { guestId }
      });

      console.log("🛍️ Cart Response:", response.data);
      setCartItems(response.data?.products || []);
    } catch (error) {
      console.error("❌ Error fetching cart:", error.response?.data || error);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    toggleCartDrawer(); // ✅ Close drawer first

    setTimeout(() => {
      if (!token) {
        toast.warning("Please log in to proceed to checkout.");
        navigate("/login", { state: { from: "/checkout" } });
      } else {
        navigate("/checkout");
      }
    }, 300);
  };

  return (
    <>
      {/* 🔒 Cart Drawer Container */}
      <div
        className={`fixed top-0 right-0 z-50 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-gray-300 shadow-xl transform transition-transform duration-500 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ❌ Close Button */}
        <div className="p-4 flex justify-end">
          <IoMdClose
            onClick={toggleCartDrawer}
            className="cursor-pointer text-3xl text-gray-800 hover:text-red-500 transition-all duration-300"
          />
        </div>

        {/* 🛒 Title */}
        <h2 className="text-2xl font-bold px-6 text-gray-800 border-b border-gray-400 pb-2 animate-slideInDown">
          Your Cart
        </h2>

        {/* 🧺 Cart Contents */}
        <div className="px-4 py-2 h-[70%] overflow-y-auto custom-scrollbar">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-700 mt-10 animate-pulse">
              Your cart is empty.
            </p>
          ) : (
            <CartContents cartItems={cartItems} fetchCart={fetchCart} />
          )}
        </div>

        {/* 🛍️ Checkout Button */}
        <div className="p-4 border-t border-gray-500 bg-gray-600/20">
          <button
            onClick={handleCheckout}
            className="w-full bg-gray-600 text-white py-3 rounded-md border border-gray-200 shadow-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* 🔔 Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default CartDrawer;
