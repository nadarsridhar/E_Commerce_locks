// import React from 'react'
// import heroImg from "../../assets/herolockbg.jpg"
// import { Link } from 'react-router-dom'

// const Hero = () => {
//   return (
//     <section className='relative'>
//         <img src={heroImg} alt="Main Image" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
//         <div className='absolute inset-0 bg-black/5 flex items-center justify-center'>
//             <div className="text-center text-white p-6">
//                 <h1  className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>Security <br />Locks </h1>
//                 <p className='text-sm tracking-tighter md:text-lg mb-6'>
//                     Explore our high-Quality locks.
//                 </p>
//                 <Link to='/collections/all' className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>Shop Now</Link>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Hero
import React from 'react';
import heroImg from "../../assets/herolockbg.jpg";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative overflow-hidden'>
      <img
        src={heroImg}
        alt="Main Image"
        className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover brightness-75 grayscale-0 hover:grayscale transition-all duration-700'
      />

      {/* Overlay */}
      <div className='absolute inset-0  flex items-center justify-center '>
        <div className="text-center text-white p-6 animate-fadeIn">
          <h1 className='text-4xl text-gray-200 md:text-8xl font-extrabold uppercase tracking-tight mb-6 border-b-4 border-gray-400 inline-block pb-2 shadow-lg shadow-gray-600/40'>
            Security <br /> Locks
          </h1>

          <p className='text-sm md:text-lg text-white font-light tracking-widest mb-6 animate-pulse'>
            Explore our high-quality locks made for real protection.
          </p>

          <Link
            to='/collections/all'
            className='bg-gray-200 text-gray-800 px-8 py-3 text-lg font-semibold rounded-md shadow-md border border-gray-600 hover:bg-gray-600 hover:text-white transition-all duration-500 hover:scale-105'
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
