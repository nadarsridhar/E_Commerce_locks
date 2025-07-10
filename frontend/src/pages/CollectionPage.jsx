import React, { useEffect, useState } from "react";
import SortOptions from "../components/products/SortOptions";
import Productgrid from "../components/products/Productgrid";
import { useSearchParams } from "react-router-dom";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        let data = await response.json();

        // Sorting logic based on query param
        if (sortBy === "priceAsc") {
          data.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceDesc") {
          data.sort((a, b) => b.price - a.price);
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [sortBy]); // 👈 depend on sortBy change

  return (
    <div className="flex flex-col lg:flex-row bg-gray-300">
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 border-gray-200">All Collection</h2>

        {/* Sort Dropdown */}
        <SortOptions />

        {/* Product Grid */}
        <Productgrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
