// // import React, { useEffect, useState } from 'react';
// // import Hero from '../components/Layout/Hero';
// // import TypesOfLocks from '../components/products/TypesOfLocks';
// // import NewArrivals from '../components/products/NewArrivals';
// // import ProductDetails from '../components/products/ProductDetails';
// // import Productgrid from '../components/products/Productgrid';
// // import FeaturedCollection from '../components/products/FeaturedCollection';
// // import axios from 'axios';

// // const Home = () => {
// //   const [bestSeller, setBestSeller] = useState(null);

// //   useEffect(() => {
// //     const fetchBestSeller = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:9000/api/products/best-seller");
// //         setBestSeller(response.data);
// //       } catch (error) {
// //         console.error("Error fetching best seller:", error);
// //       }
// //     };

// //     fetchBestSeller();
// //   }, []);

// //   return (
// //     <div>
// //       <Hero />
// //       <NewArrivals/>
// //       {/* Add 3 categories Traditional, smart , specialized lock */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 my-8">
// //   {/* Traditional Lock */}
// //   <div className="relative">
// //     <img
// //       src="https://res.cloudinary.com/daegmmbak/image/upload/v1740997983/Traditional%20locks/dobpxe1pi65rq9usvyrr.jpg"
// //       alt="Traditional Lock"
// //       className="w-full h-120 object-cover rounded-lg"
// //     />
// //     <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
// //       Traditional Lock
// //     </div>
// //   </div>

// //   {/* Smart Lock */}
// //   <div className="relative">
// //     <img
// //       src="https://res.cloudinary.com/daegmmbak/image/upload/v1740998022/Smart%20locks/qjdcdb01zwtirfdcebrk.jpg"
// //       alt="Smart Lock"
// //       className="w-full h-120 object-cover rounded-lg"
// //     />
// //     <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
// //       Smart Lock
// //     </div>
// //   </div>

// //   {/* Specialized Lock */}
// //   <div className="relative">
// //     <img
// //       src="https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/m80m6qvakskeeag9e9ow.jpg"
// //       alt="Specialized Lock"
// //       className="w-full h-120 object-cover rounded-lg"
// //     />
// //     <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
// //       Specialized Lock
// //     </div>
// //   </div>
// // </div>

// //       {/* Best Seller */}
// //       <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
// //       <ProductDetails product={bestSeller} />

// //       <FeaturedCollection />
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useEffect, useState } from 'react';
// import Hero from '../components/Layout/Hero';
// import NewArrivals from '../components/products/NewArrivals';
// import ProductDetails from '../components/products/ProductDetails';
// import FeaturedCollection from '../components/products/FeaturedCollection';
// import axios from 'axios';

// const Home = () => {
//   const [bestSeller, setBestSeller] = useState(null);

//   useEffect(() => {
//     const fetchBestSeller = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/api/products/best-seller");
//         setBestSeller(response.data);
//       } catch (error) {
//         console.error("Error fetching best seller:", error);
//       }
//     };

//     fetchBestSeller();
//   }, []);

//   return (
//     <div>
//       <Hero />

//       <NewArrivals/>

//       {/* Add 3 categories Traditional, Smart, Specialized Lock */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 my-16">
//         {/* Traditional Lock */}
//         <div className="relative group overflow-hidden">
//           <img
//             src="https://res.cloudinary.com/daegmmbak/image/upload/v1740997983/Traditional%20locks/dobpxe1pi65rq9usvyrr.jpg"
//             alt="Traditional Lock"
//             className="w-full h-120 object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
//           />
//           <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             Traditional Lock
//           </div>
//         </div>

//         {/* Smart Lock */}
//         <div className="relative group overflow-hidden">
//           <img
//             src="https://res.cloudinary.com/daegmmbak/image/upload/v1740998022/Smart%20locks/qjdcdb01zwtirfdcebrk.jpg"
//             alt="Smart Lock"
//             className="w-full h-120 object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
//           />
//           <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             Smart Lock
//           </div>
//         </div>

//         {/* Specialized Lock */}
//         <div className="relative group overflow-hidden">
//           <img
//             src="https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/m80m6qvakskeeag9e9ow.jpg"
//             alt="Specialized Lock"
//             className="w-full h-120 object-cover rounded-lg transition-transform duration-500 ease-in-out transform group-hover:scale-105"
//           />
//           <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             Specialized Lock
//           </div>
//         </div>
//       </div>

//       {/* Best Seller */}
//       <h2 className="text-4xl text-center font-bold mb-6 animate__animated animate__fadeIn">Best Seller</h2>
//       <ProductDetails product={bestSeller} />

//       <FeaturedCollection />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import NewArrivals from '../components/products/NewArrivals';
import ProductDetails from '../components/products/ProductDetails';
import FeaturedCollection from '../components/products/FeaturedCollection';
import axios from 'axios';

const Home = () => {
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/products/best-seller");
        setBestSeller(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };

    fetchBestSeller();
  }, []);

  return (
    <div className='bg-gray-300' >
      <Hero />

      <NewArrivals/>

      {/* Add 3 categories Traditional, Smart, Specialized Lock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 my-16 ">
        {/* Traditional Lock */}
        <div className="relative group overflow-hidden border-4 border-gray-300 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 hover:bg-gradient-to-bl hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
          <img
            src="https://res.cloudinary.com/daegmmbak/image/upload/v1740997983/Traditional%20locks/dobpxe1pi65rq9usvyrr.jpg"
            alt="Traditional Lock"
            className="w-full h-120 object-cover rounded-xl transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Traditional Lock
          </div>
        </div>

        {/* Smart Lock */}
        <div className="relative group overflow-hidden border-4 border-gray-300 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 hover:bg-gradient-to-bl hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-300 shadow-lg">
          <img
            src="https://res.cloudinary.com/daegmmbak/image/upload/v1740998022/Smart%20locks/qjdcdb01zwtirfdcebrk.jpg"
            alt="Smart Lock"
            className="w-full h-120 object-cover rounded-xl transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Smart Lock
          </div>
        </div>

        {/* Specialized Lock */}
        <div className="relative group overflow-hidden border-4 border-gray-300 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 hover:bg-gradient-to-bl hover:from-red-500 hover:via-red-600 hover:to-red-700 transition-all duration-300 shadow-lg">
          <img
            src="https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/m80m6qvakskeeag9e9ow.jpg"
            alt="Specialized Lock"
            className="w-full h-120 object-cover rounded-xl transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Specialized Lock
          </div>
        </div>
      </div>

      {/* Best Seller */}
      <h2 className="text-4xl text-center font-bold mb-6 animate__animated animate__fadeIn text-gray-800">Best Seller</h2>
      <div className="border-4 border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6 shadow-xl">
        <ProductDetails product={bestSeller} />
      </div>

      <FeaturedCollection />
    </div>
  );
};

export default Home;
