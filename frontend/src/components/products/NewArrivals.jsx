// import React, { useEffect, useRef, useState } from 'react'
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// const NewArrivals = () => {
//     const scrollRef = useRef(null);
//     const [newArrivals, setNewArrivals] = useState([]);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollLeft, setScrollLeft] = useState(0);
//     const [canScrollLeft, setCanscrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);

//     useEffect(() => {
//         const fetchNewArrivals = async () => {
//             try {
//                 const res = await axios.get('http://localhost:9000/api/products/new-arrivals');
//                 setNewArrivals(res.data);
//             } catch (error) {
//                 console.error("Failed to fetch new arrivals:", error);
//             }
//         };

//         fetchNewArrivals();
//     }, []);

//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         setStartX(e.pageX - scrollRef.current.offsetLeft);
//         setScrollLeft(scrollRef.current.scrollLeft);
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging) return;
//         const x = e.pageX - scrollRef.current.offsetLeft;
//         const walk = x - startX;
//         scrollRef.current.scrollLeft = scrollLeft - walk;
//     };

//     const handleMouseUpOrLeave = () => {
//         setIsDragging(false);
//     };

//     const scroll = (direction) => {
//         const scrollAmount = direction === "left" ? -300 : 300;
//         scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     };

//     const updateScrollButtons = () => {
//         const container = scrollRef.current;
//         if (container) {
//             const leftScroll = container.scrollLeft;
//             const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
//             setCanscrollLeft(leftScroll > 0);
//             setCanScrollRight(rightScrollable);
//         }
//     };

//     useEffect(() => {
//         const container = scrollRef.current;
//         if (container) {
//             container.addEventListener("scroll", updateScrollButtons);
//             updateScrollButtons();
//             return () => container.removeEventListener("scroll", updateScrollButtons);
//         }
//     }, []);

//     return (
//         <section className='py-16 px-0 lg:px-0'>
//             <div className="container mx-auto text-center mb-10 relative">
//                 <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
//                 <p className='text-lg text-gray-600 mb-8'>Discover our newest collection of high-quality security locks, featuring the latest technology and robust designs.</p>
//                 <div className="absolute right-0 bottom-[-30px] flex space-x-2">
//                     <button onClick={() => scroll("left")}
//                         disabled={!canScrollLeft}
//                         className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//                         <FiChevronLeft className='text-2xl' />
//                     </button>
//                     <button onClick={() => scroll("right")}
//                         className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
//                         <FiChevronRight className='text-2xl' />
//                     </button>
//                 </div>
//             </div>

//             <div ref={scrollRef}
//                 className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUpOrLeave}
//                 onMouseLeave={handleMouseUpOrLeave}>

//                 {newArrivals.map((product) => (
//                     <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] relative'>
//                         <img
//                             src={product.images[0]?.url}
//                             alt={product.images[0]?.altText || product.name}
//                             className='w-full h-[400px] object-cover rounded-lg'
//                             draggable="false" />
//                         <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md text-black p-4 rounded-b-lg">
//                             <Link to={`/product/${product._id}`} className='block'>
//                                 <h4 className='font-medium'>{product.name}</h4>
//                                 <p className='mt-1'>₹{product.price}</p>
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

// export default NewArrivals
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [newArrivals, setNewArrivals] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollLeft, setCanscrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const res = await axios.get('http://localhost:9000/api/products/new-arrivals');
                setNewArrivals(res.data);
            } catch (error) {
                console.error("Failed to fetch new arrivals:", error);
            }
        };

        fetchNewArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
            setCanscrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, []);

    return (
        <section className='py-16 px-4 lg:px-0 bg-gray-300 '>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className='text-4xl font-extrabold text-gray-800 mb-4 transition-all duration-500 ease-in-out hover:text-gray-900 transform hover:scale-105'>
                    Explore New Arrivals
                </h2>
                <p className='text-lg text-gray-700 mb-8'>
                    Discover our newest collection of high-quality security locks, featuring the latest technology and robust designs.
                </p>
                <div className="absolute right-0 bottom-[-30px] flex space-x-4 z-10">
                    <button onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-4 rounded-full border-2 ${canScrollLeft ? "bg-white text-black hover:bg-gray-100" : "bg-gray-200 text-gray-400 cursor-not-allowed"} transition-all duration-300`}>
                        <FiChevronLeft className='text-3xl' />
                    </button>
                    <button onClick={() => scroll("right")}
                        className={`p-4 rounded-full border-2 ${canScrollRight ? "bg-white text-black hover:bg-gray-100" : "bg-gray-200 text-gray-400 cursor-not-allowed"} transition-all duration-300`}>
                        <FiChevronRight className='text-3xl' />
                    </button>
                </div>
            </div>

            <div ref={scrollRef}
                className={`container mx-auto overflow-x-scroll flex space-x-8 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"} pb-4 transition-all duration-300`}>
                {newArrivals.map((product) => (
                    <div key={product._id} className='min-w-[100%] sm:min-w-[45%] lg:min-w-[20%] relative group overflow-hidden rounded-lg border-4 border-gray-300 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-gray-800'>
                        <img
                            src={product.images[0]?.url}
                            alt={product.images[0]?.altText || product.name}
                            className='w-full h-[350px] object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110'
                            draggable="false" />
                        <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-md text-black p-6 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-semibold text-lg'>{product.name}</h4>
                                <p className='mt-2 text-xl font-medium'>₹{product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals;
