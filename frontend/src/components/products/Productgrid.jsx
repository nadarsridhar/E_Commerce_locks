// import React from 'react'
// import { Link } from 'react-router-dom'

// const Productgrid = ({products }) => {
//   return (
//     <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//         {products.map((product,index) =>(
//             <Link key={index}  to={`/product/${product.id}`} className="block">
//                 <div className=" bg-white p-4 rounded-lg">
//                     <div className=" w-full h-96 mb-4 ">
//                         <img src={product.images[0].url} alt={product.images[0].altext || product.name}
//                         className=' w-full h-full object-cover rounded-lg' />
//                     </div>
//                     <h3 className=' text-sm mb-2 '>{product.name}</h3>
//                     <p className=' text-gray-500 font-medium text-sm tracking-tighter'>₹ {product.price}</p>
//                 </div>
//             </Link>
//         )
//     )}
//     </div>
//   )
// }

// export default Productgrid

// import React from 'react'
// import { Link } from 'react-router-dom'

// const Productgrid = ({ products }) => {
//     if (!products || products.length === 0) {
//         return <p>No products found.</p>;
//     }

//     return (
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//             {products.map((product, index) => (
//                 <Link key={index} to={`/product/${product.sku}`} className="block">
//                     <div className="bg-white p-4 rounded-lg">
//                         <div className="w-full h-96 mb-4">
//                             <img
//                                 src={product.img}   // yaha direct img use kiya hai
//                                 alt={product.name}
//                                 className='w-full h-full object-cover rounded-lg'
//                             />
//                         </div>
//                         <h3 className='text-sm mb-2'>{product.name}</h3>
//                         <p className='text-gray-500 font-medium text-sm tracking-tighter'>₹ {product.price}</p>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     )
// }

// export default Productgrid

// import React from 'react'
// import { Link } from 'react-router-dom'

// const Productgrid = ({ products = [] }) => {
//     if (!Array.isArray(products) || products.length === 0) {
//         return <p>No products found.</p>;
//     }

//     return (
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//             {products.map((product, index) => (
//                 <Link key={index} to={`/product/${product.sku}`} className="block">
//                     <div className="bg-white p-4 rounded-lg">
//                         <div className="w-full h-96 mb-4">
//                             <img
//                                 src={product.img}
//                                 alt={product.name}
//                                 className='w-full h-full object-cover rounded-lg'
//                             />
//                         </div>
//                         <h3 className='text-sm mb-2'>{product.name}</h3>
//                         <p className='text-gray-500 font-medium text-sm tracking-tighter'>₹ {product.price}</p>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// }

// export default Productgrid;


// import React from 'react'
// import { Link } from 'react-router-dom'

// const Productgrid = ({ products = [] }) => {
//     if (!Array.isArray(products) || products.length === 0) {
//         return <p>No products found.</p>;
//     }

//     return (
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
//             {products.map((product, index) => (
//                 <Link key={index} to={`/product/${product._id}`} className="block">
//                     <div className="bg-white p-4 rounded-lg">
//                         <div className="w-full h-96 mb-4">
//                             <img
//                                 src={product.images?.[0]?.url || '/fallback-image.png'}   // <-- ✅ Here
//                                 alt={product.images?.[0]?.altText || product.name}        // <-- ✅ Here
//                                 className='w-full h-full object-cover rounded-lg'
//                             />
//                         </div>
//                         <h3 className='text-sm mb-2'>{product.name}</h3>
//                         <p className='text-gray-500 font-medium text-sm tracking-tighter'>₹ {product.price}</p>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// }

// export default Productgrid;

import React from 'react'
import { Link } from 'react-router-dom'

const Productgrid = ({ products = [] }) => {
    if (!Array.isArray(products) || products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-300'>
            {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="block">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="w-full h-96 mb-4">
                            <img
                                src={product.images?.[0]?.url || '/fallback-image.png'}
                                alt={product.images?.[0]?.altText || product.name}
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h3 className='text-sm mb-2 truncate'>{product.name}</h3>
                        {product.discountPrice && (
                            <p className='text-xs text-gray-400 line-through'>₹{product.discountPrice}</p>
                        )}
                        <p className='text-gray-500 font-medium text-sm tracking-tighter'>₹{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Productgrid;
