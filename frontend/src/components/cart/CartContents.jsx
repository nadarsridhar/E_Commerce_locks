import React, { useEffect, useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import axios from "axios";

const CartContents = ({ cartItems, fetchCart }) => {
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:9000/api/cart";

  const handleQuantityChange = async (product, increment) => {
    const newQuantity = product.quantity + increment;
    if (newQuantity < 1) return;

    const guestId = localStorage.getItem("guestId") || "";
    const userId = localStorage.getItem("userId") || "";

    try {
      setLoading(true);
      await axios.patch(`${API_URL}/update`, {
        guestId: userId ? undefined : guestId,
        userId: userId || undefined,
        productId: product.productId,
        quantity: newQuantity,
        size: product.size,
        color: product.color
      });
      fetchCart(); // ✅ Fix: Cart Update hone ke baad refresh ho
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (product) => {
    const guestId = localStorage.getItem("guestId") || "";
    const userId = localStorage.getItem("userId") || "";

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/remove`, {
        data: {
          guestId: userId ? undefined : guestId,
          userId: userId || undefined,
          productId: product.productId,
          size: product.size,
          color: product.color
        }
      });
      fetchCart(); // ✅ Fix: Item delete hone ke baad refresh ho
    } catch (error) {
      console.error("❌ Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        cartItems.map((product) => (
          <div key={product.productId} className="flex justify-between py-4 border-b">
            <div className="flex">
              <img src={product.image} className="w-20 h-20 object-cover" alt={product.name} />
              <div className="ml-4">
                <h3>{product.name}</h3>
                <p className="text-sm text-gray-500">Color: {product.color}</p>
                <p className="text-sm text-gray-500">Size: {product.size}</p>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(product, -1)} disabled={loading}>-</button>
                  <span className="mx-2">{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product, 1)} disabled={loading}>+</button>
                </div>
              </div>
            </div>
            <div>
              <p>₹{product.price}</p>
              <RiDeleteBin3Line onClick={() => handleRemove(product)} className="cursor-pointer text-red-500" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartContents;
