import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import Productgrid from "../components/products/Productgrid";

const SpecializedLocksPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:9000/api/products");  // Backend URL
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
  
          // Safeguard to make sure data is array, even if API sends wrong data
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error("Expected array, but got:", data);
            setProducts([]);
          }
        } catch (error) {
          console.error("Error fetching products:", error.message);
          setProducts([]);  // Fallback to empty array in case of error
        }
      };
  
      fetchProducts();
    }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">Specialized Locks</h2>

        <SortOptions />

        <Productgrid products={products} />
      </div>
    </div>
  );
};

export default SpecializedLocksPage;
