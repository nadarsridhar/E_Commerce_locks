// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const FilterSidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     category: "",
//     color: "",
//     material: [],
//     brand: [],
//     minPrice: 500,
//     maxPrice: 30000,
//   });

//   const [priceRange, setPriceRange] = useState([500, 30000]);
 

//   const categories = ["Traditional Lock", "Smart Lock", "Specialized Lock"];
//   const colors = ["Black", "Silver", "Gold", "Brown"];
//   const materials = ["Brass", "Steel", "Plastic"];
//   const brands = ["Yale", "Godrej", "Dura", "ABUS", "Dorset"];

//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);
//     setFilters({
//       category: params.category || "",
//       color: params.color || "",
//       material: params.material ? params.material.split(",") : [],
//       brand: params.brand ? params.brand.split(",") : [],
//       minPrice: params.minPrice || 500,
//       maxPrice: params.maxPrice || 30000,
//     });

//     setPriceRange([500, params.maxPrice || 30000]);
//   }, [searchParams]);

//   const handleFilterChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     let newFilters = { ...filters };

//     if (type === "checkbox") {
//       if (checked) {
//         newFilters[name] = [...(newFilters[name] || []), value];
//       } else {
//         newFilters[name] = newFilters[name].filter((item) => item !== value);
//       }
//     } else {
//       newFilters[name] = value;
//     }

//     setFilters(newFilters);
//     updateURLParams(newFilters);
//   };

//   const updateURLParams = (newFilters) => {
//     const params = new URLSearchParams();
//     Object.keys(newFilters).forEach((key) => {
//       if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
//         params.append(key, newFilters[key].join(","));
//       } else if (newFilters[key]) {
//         params.append(key, newFilters[key]);
//       }
//     });

//     setSearchParams(params);
//     navigate(`?${params.toString()}`);
//   };

//   const handlePriceChange = (e) => {
//     const newPrice = e.target.value;
//     setPriceRange([500, newPrice]);
//     const newFilters = { ...filters, minPrice: 500, maxPrice: newPrice };
//     setFilters(newFilters);
//     updateURLParams(newFilters);
//   };

//   return (
//     <div className="p-4">
//       <h3 className="text-xl font-medium text-gray-800 mb-4 lg:hidden">Filter</h3>

//       {/* Category Filter */}
//       <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Category</label>
//         {categories.map((category) => (
//           <div key={category} className="flex items-center mb-1">
//             <input
//               type="radio"
//               name="category"
//               value={category}
//               checked={filters.category === category}
//               onChange={handleFilterChange}
//               className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//             />
//             <span className="text-gray-700">{category}</span>
//           </div>
//         ))}
//       </div>

//       {/* Color Filter */}
//       <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Color</label>
//         <div className="flex flex-wrap gap-2">
//           {colors.map((color) => (
//             <button
//               key={color}
//               name="color"
//               value={color}
//               onClick={() => handleFilterChange({ target: { name: "color", value: color } })}
//               className={`w-8 h-8 rounded-full border cursor-pointer transition hover:scale-105 ${
//                 filters.color === color ? "ring-2 ring-blue-500" : ""
//               }`}
//               style={{ backgroundColor: color.toLowerCase() }}
//             ></button>
//           ))}
//         </div>
//       </div>

//       {/* Material Filter */}
//       <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Material</label>
//         {materials.map((material) => (
//           <div key={material} className="flex items-center mb-1">
//             <input
//               type="checkbox"
//               name="material"
//               value={material}
//               checked={filters.material.includes(material)}
//               onChange={handleFilterChange}
//               className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//             />
//             <span className="text-gray-700">{material}</span>
//           </div>
//         ))}
//       </div>

//       {/* Brand Filter */}
//       <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Brand</label>
//         {brands.map((brand) => (
//           <div key={brand} className="flex items-center mb-1">
//             <input
//               type="checkbox"
//               name="brand"
//               value={brand}
//               checked={filters.brand.includes(brand)}
//               onChange={handleFilterChange}
//               className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//             />
//             <span className="text-gray-700">{brand}</span>
//           </div>
//         ))}
//       </div>

//       {/* Price Range Filter */}
//       <div className="mb-8">
//         <label className="block text-gray-600 font-medium mb-2">Price Range</label>
//         <input
//           type="range"
//           name="priceRange"
//           min={500}
//           max={30000}
//           value={priceRange[1]}
//           onChange={handlePriceChange}
//           className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//         />
//         <div className="flex justify-between text-gray-600 mt-2">
//           <span>₹500</span>
//           <span>₹{priceRange[1]}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    material: [],
    brand: [],
    minPrice: 500,
    maxPrice: 30000,
  });

  const [priceRange, setPriceRange] = useState([500, 30000]);
  const [products, setProducts] = useState([]); // State to hold products fetched from the API

  const categories = ["Traditional Lock", "Smart Lock", "Specialized Lock"];
  const colors = ["Black", "Silver", "Gold", "Brown"];
  const materials = ["Brass", "Steel", "Plastic"];
  const brands = ["Yale", "Godrej", "Dura", "ABUS", "Dorset"];

  // Fetch products based on the filter values
  const fetchProducts = async (filters) => {
    try {
      const { category, color, material, brand, minPrice, maxPrice } = filters;

      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category);
      if (color) queryParams.append("color", color);
      if (material.length > 0) queryParams.append("material", material.join(","));
      if (brand.length > 0) queryParams.append("brand", brand.join(","));
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);

      // Fetch the filtered products from the backend
      const response = await axios.get(`/api/products?${queryParams.toString()}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount or when filters change
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 500,
      maxPrice: params.maxPrice || 30000,
    });

    setPriceRange([500, params.maxPrice || 30000]);
    fetchProducts({
      category: params.category,
      color: params.color,
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 500,
      maxPrice: params.maxPrice || 30000,
    });
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
    fetchProducts(newFilters); // Fetch updated products after filter change
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([500, newPrice]);
    const newFilters = { ...filters, minPrice: 500, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
    fetchProducts(newFilters); // Fetch updated products after price change
  };

  return (
    <div className="p-4, hidden">
      <h3 className="text-xl font-medium text-gray-800 mb-4 lg:hidden">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={() => handleFilterChange({ target: { name: "color", value: color } })}
              className={`w-8 h-8 rounded-full border cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={500}
          max={30000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₹500</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Display filtered products */}
      <div className="mt-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product._id} className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>{product.description}</p>
                <span>₹{product.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
