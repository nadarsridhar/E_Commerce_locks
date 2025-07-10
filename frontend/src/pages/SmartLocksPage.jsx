// import React, { useEffect, useRef, useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import FilterSidebar from "../components/products/FilterSidebar";
// import SortOptions from "../components/products/SortOptions";
// import Productgrid from "../components/products/Productgrid";

// const SmartLocksPage = () => {
//   const [products, setProducts] = useState([]);
//   const sidebarRef = useRef(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//       setIsSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       const fetchedProducts = [
//         {
//           _id: 1,
//           name: "Biometric Smart Lock",
//           price: 5000,
//           images: [{ url: "/src/assets/smartlock/smart lock 1.jpg" }],
//         },
//         {
//           _id: 2,
//           name: "Keyless Smart Lock",
//           price: 4500,
//           images: [{ url: "/src/assets/smartlock/smart lock 7.jpg" }],
//         },
//         {
//           _id: 3,
//           name: "Smart Mortise Lock",
//           price: 6000,
//           images: [{ url: "/src/assets/smartlock/smart lock 8.jpg" }],
//         },
//         {
//           _id: 4,
//           name: "Biometric Smart Lock",
//           price: 5000,
//           images: [{ url: "/src/assets/smartlock/smart lock 11.jpg" }],
//         },
//         {
//           _id: 5,
//           name: "Keyless Smart Lock",
//           price: 4500,
//           images: [{ url: "/src/assets/smartlock/smart lock 12.jpg" }],
//         },
//         {
//           _id: 6,
//           name: "Smart Mortise Lock",
//           price: 6000,
//           images: [{ url: "/src/assets/smartlock/smart lock 6.jpg" }],
//         },
//         {
//           _id: 7,
//           name: "Keyless Smart Lock",
//           price: 4500,
//           images: [{ url: "/src/assets/smartlock/smart lock 3.jpg" }],
//         },
//         {
//           _id: 8,
//           name: "Smart Mortise Lock",
//           price: 6000,
//           images: [{ url: "/src/assets/smartlock/smart lock 4.jpg" }],
//         },
//       ];
//       setProducts(fetchedProducts);
//     }, 1000);
//   }, []);

//   return (
//     <div className="flex flex-col lg:flex-row">
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden border p-2 flex justify-center items-center"
//       >
//         <FaFilter className="mr-2" /> Filters
//       </button>

//       <div
//         ref={sidebarRef}
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
//       >
//         <FilterSidebar />
//       </div>

//       <div className="flex-grow p-4">
//         <h2 className="text-2xl uppercase mb-4">Smart Locks</h2>

//         <SortOptions />

//         <Productgrid products={products} />
//       </div>
//     </div>
//   );
// };

// export default SmartLocksPage;

import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import Productgrid from "../components/products/Productgrid";

const SmartLocksPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading products...</div>;
  }

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
        <h2 className="text-2xl uppercase mb-4">Smart Locks</h2>

        <SortOptions />

        <Productgrid products={products} />
      </div>
    </div>
  );
};

export default SmartLocksPage;
