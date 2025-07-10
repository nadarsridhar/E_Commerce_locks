// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TbBrandMeta } from 'react-icons/tb';
// import { IoLogoInstagram } from 'react-icons/io';
// import { RiTwitterXLine } from 'react-icons/ri';
// import { FiPhoneCall } from 'react-icons/fi';
// import axios from 'axios';

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:9000/api/subscribe", { email });
//       setMessage(res.data.message);
//       setEmail(""); // Clear input after success
//     } catch (error) {
//       const msg = error.response?.data?.message || "Something went wrong!";
//       setMessage(msg);
//     }
//   };

//   return (
//     <footer className='border-t py12'>
//       <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 px-4 lg:px-0'>
//         {/* Newsletter Section */}
//         <div>
//           <h3 className='text-lg text-gray-800 mb-4'>NewsLetter</h3>
//           <p className='text-gray-500 mb-4'>
//             Be the first one to hear about new locks, and online offers.
//           </p>
//           <p className='font-medium text-sm text-gray-600 mb-6'>
//             Sign up and get 10% off on your first order.
//           </p>
//           {/* Newsletter Form */}
//           <form onSubmit={handleSubscribe} className='flex'>
//             <input
//               type="email"
//               placeholder='Enter your email'
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
//             />
//             <button
//               type='submit'
//               className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-500 transition-all'
//             >
//               Subscribe
//             </button>
//           </form>
//           {message && <p className='text-sm mt-2 text-blue-600'>{message}</p>}
//         </div>

//         {/* Shop Links */}
//         <div>
//           <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
//           <ul className='space-y-2 text-gray-600'>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>Traditional Locks</Link></li>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>Smart Locks</Link></li>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>Specialized Locks</Link></li>
//           </ul>
//         </div>

//         {/* Support Links */}
//         <div>
//           <h3 className="text-lg text-gray-800 mb-4">Support</h3>
//           <ul className='space-y-2 text-gray-600'>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>Contact Us</Link></li>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>About Us</Link></li>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>FAQs</Link></li>
//             <li><Link to='#' className='hover:text-gray-500 transition-colors'>Features</Link></li>
//           </ul>
//         </div>

//         {/* Social & Contact */}
//         <div>
//           <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
//           <div className='flex items-center space-x-4 mb-6'>
//             <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
//               <TbBrandMeta className='h-5 w-5' />
//             </a>
//             <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
//               <IoLogoInstagram className='h-5 w-5' />
//             </a>
//             <a href="https://twitter.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'>
//               <RiTwitterXLine className='h-4 w-5' />
//             </a>
//           </div>
//           <p className='text-gray-500'>Call Us</p>
//           <p>
//             <FiPhoneCall className='inline-block mr-2' />
//             +91-82852-22646
//           </p>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
//         <p className='text-gray-500 text-sm tracking-tighter text-center'>
//           © 2025, Miracle Security. All Rights Reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/subscribe", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      setMessage(msg);
    }
  };

  return (
    <footer className='bg-gray-200 border-t shadow-inner py-12 transition-all duration-300'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        
        {/* Newsletter Section */}
        <div className='p-4 border border-gray-300 rounded-md bg-white hover:shadow-xl transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray-600 mb-2'>Be the first to hear about new locks & offers.</p>
          <p className='text-sm font-medium text-gray-700 mb-4'>Sign up & get 10% off your first order.</p>
          <form onSubmit={handleSubscribe} className='flex shadow-sm'>
            <input
              type="email"
              placeholder='Enter your email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all'
            />
            <button
              type='submit'
              className='bg-gray-600 text-white px-6 py-3 text-sm font-semibold rounded-r-md hover:bg-gray-800 transition-all duration-300'
            >
              Subscribe
            </button>
          </form>
          {message && <p className='text-sm mt-3 text-blue-600 animate-pulse'>{message}</p>}
        </div>

        {/* Shop Links
        <div className='p-4 border border-gray-300 rounded-md bg-white hover:shadow-xl transition-all duration-300'>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <ul className='space-y-2 text-gray-700'>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>Traditional Locks</Link></li>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>Smart Locks</Link></li>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>Specialized Locks</Link></li>
          </ul>
        </div> */}

        {/* Support Links */}
        <div className='p-4 border border-gray-300 rounded-md bg-white hover:shadow-xl transition-all duration-300'>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className='space-y-2 text-gray-700'>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>Contact Us</Link></li>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>About Us</Link></li>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>FAQs</Link></li>
            <li><Link to="#" className='hover:text-gray-600 hover:underline transition-all'>Features</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className='p-4 border border-gray-300 rounded-md bg-white hover:shadow-xl transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Follow Us</h3>
          <div className='flex items-center space-x-5 mb-6'>
            <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-gray-900 hover:scale-110 transition-transform duration-300'>
              <TbBrandMeta className='h-6 w-6' />
            </a>
            <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-pink-600 hover:scale-110 transition-transform duration-300'>
              <IoLogoInstagram className='h-6 w-6' />
            </a>
            <a href="https://twitter.com" target='_blank' rel='noopener noreferrer' className='text-gray-700 hover:text-black hover:scale-110 transition-transform duration-300'>
              <RiTwitterXLine className='h-5 w-6' />
            </a>
          </div>
          <p className='text-gray-600'>Call Us</p>
          <p className='text-gray-700 font-medium mt-1'>
            <FiPhoneCall className='inline-block mr-2 text-gray-600' />
            +91-82852-22646
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-300 pt-6'>
        <p className='text-gray-600 text-sm text-center tracking-tight'>
          © 2025, <span className='font-semibold'>Miracle Security</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
