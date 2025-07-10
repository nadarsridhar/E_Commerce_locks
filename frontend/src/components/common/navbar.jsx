// import { Link, useNavigate } from "react-router-dom";
// import Searchbar from "./SearchBar";
// import {
//   HiOutlineUser,
//   HiOutlineShoppingBag,
//   HiBars3BottomRight,
// } from "react-icons/hi2";
// import CartDrawer from "../Layout/CartDrawer";
// import { useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";

// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [navDrawerOpen, setNavDrawerOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   const toggleNavdrawer = () => setNavDrawerOpen(!navDrawerOpen);
//   const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

//   const checkAdmin = () => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     setIsAdmin(userData?.isAdmin === true);
//   };

//   useEffect(() => {
//     checkAdmin();

//     const interval = setInterval(() => {
//       checkAdmin();
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsAdmin(false);
//     navigate("/");
//   };


//   return (
//     <>
//       <nav className="container mx-auto flex items-center justify-between py-4 px-6">
//         <div>
//           <Link to="/" className="text-2xl font-medium">Miracle Security</Link>
//         </div>

//         <div className="hidden md:flex space-x-6">
//           <Link to="/collections/all" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
//             All Collection
//           </Link>
//         </div>

//         <div className="flex items-center space-x-4">
//           {isAdmin && (
//             <Link to="/admin" className="block rounded text-sm bg-amber-950 px-2 text-white">Admin</Link>
//           )}

//           <Link to="/profile" className="hover:text-black">
//             <HiOutlineUser className="h-6 w-6 text-gray-700" />
//           </Link>
//           <button onClick={toggleCartDrawer} className="relative hover:text-black">
//             <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
//             <span className="absolute -top-1 bg-amber-700 text-white text-xs rounded-full px-2 py-0.5">2</span>
//           </button>

//           {/* <div className="overflow-hidden">
//             <Searchbar />
//           </div> */}

//           <button onClick={toggleNavdrawer} className="md:hidden">
//             <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
//           </button>
//         </div>
//       </nav>

//       <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

//       <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
//         <div className="flex justify-end p-4">
//           <button onClick={toggleNavdrawer}>
//             <IoMdClose className="h-6 w-6 text-gray-600" />
//           </button>
//         </div>
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Menu</h2>
//           <nav className="space-y-4">
//             <Link to="/collections/all" onClick={toggleNavdrawer} className="block text-gray-600 hover:text-black">Traditional Locks</Link>
//             <Link to="#" onClick={toggleNavdrawer} className="block text-gray-600 hover:text-black">Smart Locks</Link>
//             <Link to="#" onClick={toggleNavdrawer} className="block text-gray-600 hover:text-black">Specialized Locks</Link>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import CartDrawer from "../Layout/CartDrawer";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const toggleNavdrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  const checkAdmin = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(userData?.isAdmin === true);
  };

  useEffect(() => {
    checkAdmin();

    const interval = setInterval(() => {
      checkAdmin();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 bg-gray-700 shadow-lg transition-all duration-300">
        <div>
          <Link to="/" className="text-2xl font-semibold text-gray-100 transition-all hover:text-black">
            Miracle Security
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
            className="text-sm  font-bold text-gray-100 uppercase hover:text-black transition-all"
          >
            All Collection
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/admin"
              className="block text-sm bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-all"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-white transition-all">
            <HiOutlineUser className="h-6 w-6 text-gray-300 hover:text-amber-500 transition-all" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-white transition-all"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-300 hover:text-amber-500 transition-all" />
            <span className="absolute -top-1  text-white text-xs rounded-full px-2 py-0.5">
            
            </span>
          </button>

          <button
            onClick={toggleNavdrawer}
            className="md:hidden text-white transition-all hover:text-amber-500"
          >
            <HiBars3BottomRight className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavdrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 hover:text-amber-500 transition-all" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all"
              onClick={toggleNavdrawer}
              className="block text-gray-600 hover:text-black transition-all"
            >
              Traditional Locks
            </Link>
            <Link
              to="#"
              onClick={toggleNavdrawer}
              className="block text-gray-600 hover:text-black transition-all"
            >
              Smart Locks
            </Link>
            <Link
              to="#"
              onClick={toggleNavdrawer}
              className="block text-gray-600 hover:text-black transition-all"
            >
              Specialized Locks
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
