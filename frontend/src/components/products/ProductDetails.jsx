// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const endpoint = id
//           ? `http://localhost:9000/api/products/${id}`
//           : `http://localhost:9000/api/products/best-seller`;
//         const { data } = await axios.get(endpoint);
//         setProduct(data);
//         setMainImage(data?.images?.[0]?.url || "");
//         setLoading(false);
//       } catch (err) {
//         setError("❌ Product not found!");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     if (!product) return alert("❌ Product not available!");
//     if (!selectedSize || !selectedColor) return alert("⚠️ Please select size and color!");

//     const guestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
//     localStorage.setItem("guestId", guestId);
//     const userId = localStorage.getItem("userId") || null;

//     try {
//       await axios.post("http://localhost:9000/api/cart", {
//         userId: userId,
//         guestId: userId ? null : guestId,
//         productId: product._id,
//         quantity: 1,
//         size: selectedSize,
//         color: selectedColor
//       });
//       alert("🛍️ Product added to cart!");
//     } catch (error) {
//       alert("❌ Failed to add product.");
//     }
//   };

//   if (loading) return <p>⏳ Loading product...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
//         <div className="w-full md:w-1/2 flex flex-col items-center p-4">
//           <img
//             src={mainImage}
//             className="w-full max-w-xs h-auto object-cover rounded-lg"
//             alt={product.name}
//           />
//           <div className="flex mt-4 space-x-2">
//             {product.images?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img.url}
//                 className="w-12 h-12 object-cover rounded cursor-pointer border border-gray-300 hover:border-blue-500"
//                 onClick={() => setMainImage(img.url)}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="p-6 flex-1">
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-2xl text-red-600 font-semibold mb-2">₹{product.price}</p>

//           {/* Description, Rating, and Reviews */}
//           <p className="text-gray-700 mb-2">{product.description}</p>
//           <p className="text-yellow-600 font-medium">
//             ⭐ {product.rating} / 5 ({product.numReviews} reviews)
//           </p>

//           <div className="mt-4">
//             <label>Size:</label>
//             <select onChange={(e) => setSelectedSize(e.target.value)} className="ml-2 border rounded px-2 py-1">
//               <option value="">Select Size</option>
//               {product.sizes?.map((size) => (
//                 <option key={size} value={size}>{size}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mt-2">
//             <label>Color:</label>
//             <select onChange={(e) => setSelectedColor(e.target.value)} className="ml-2 border rounded px-2 py-1">
//               <option value="">Select Color</option>
//               {product.colors?.map((color) => (
//                 <option key={color} value={color}>{color}</option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={handleAddToCart}
//             className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition mt-4"
//           >
//             Add to Cart 🛒
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const endpoint = id
          ? `http://localhost:9000/api/products/${id}`
          : `http://localhost:9000/api/products/best-seller`;
        const { data } = await axios.get(endpoint);
        setProduct(data);
        setMainImage(data?.images?.[0]?.url || "");
        setLoading(false);
      } catch (err) {
        setError("❌ Product not found!");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return alert("❌ Product not available!");
    if (!selectedSize || !selectedColor) return alert("⚠️ Please select size and color!");

    const guestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
    localStorage.setItem("guestId", guestId);
    const userId = localStorage.getItem("userId") || null;

    try {
      await axios.post("http://localhost:9000/api/cart", {
        userId: userId,
        guestId: userId ? null : guestId,
        productId: product._id,
        quantity: 1,
        size: selectedSize,
        color: selectedColor
      });
      alert("🛍️ Product added to cart!");
    } catch (error) {
      alert("❌ Failed to add product.");
    }
  };

  if (loading) return <p className="text-center text-lg">⏳ Loading product...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-300">
      <div className="bg-gradient-to-r from-gary-200 via-gray-600 to-gray-800 rounded-2xl shadow-2xl flex flex-col md:flex-row hover:scale-105 transition-transform duration-700 ease-out">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-6 border-4 border-gray-300 rounded-xl hover:shadow-xl transition-shadow duration-500">
          <img
            src={mainImage}
            className="w-full max-w-xs h-auto object-cover rounded-xl transform transition duration-700 hover:scale-110 hover:rotate-3"
            alt={product.name}
          />
          <div className="flex mt-4 space-x-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                className="w-16 h-16 object-cover rounded-xl cursor-pointer border-2 border-gray-300 hover:border-blue-600 transition-all duration-300"
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-6 flex-1 space-y-4">
          <h1 className="text-4xl font-extrabold text-white hover:text-gray-900 transition-all duration-300">
            {product.name}
          </h1>
          <p className="text-3xl text-red-600 font-semibold">₹{product.price}</p>

          {/* Description */}
          <p className="text-lg text-gray-300">{product.description}</p>

          {/* Rating */}
          <p className="text-yellow-100 font-medium">
            ⭐ {product.rating} / 5 ({product.numReviews} reviews)
          </p>

          {/* Size and Color Selection */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="font-semibold text-lg text-white">Size:</label>
              <select onChange={(e) => setSelectedSize(e.target.value)} className="ml-2 border rounded-lg px-4 py-2 focus:outline-none hover:border-blue-500 transition-all duration-300">
                <option  value="">Select Size</option>
                {product.sizes?.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-lg text-white">Color:</label>
              <select onChange={(e) => setSelectedColor(e.target.value)} className="ml-2 border rounded-lg px-4 py-2 focus:outline-none hover:border-blue-500 transition-all duration-300">
                <option value="">Select Color</option>
                {product.colors?.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-green-400 transition-all duration-300 mt-6 shadow-2xl hover:shadow-2xl"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
