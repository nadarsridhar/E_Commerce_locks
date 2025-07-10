import React from 'react'
import TraditionalLocks from "../../assets/padlock.webp"
import SmartLocks from "../../assets/smartdoor.jpg"
import SpecializedLocks from "../../assets/Multipointlock.jpg"
import { Link } from 'react-router-dom'

const TypesOfLocks = () => {
  return (
    <section className=' py-16 mx-auto max-w-8xl px-6' >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"> 
            {/* Traditional Lock */}    
            <div className="relative flex-1">
                <img src={TraditionalLocks} alt="Traditional Locks" className='w-full h-[700px] object-cover'/>
                <div className="absolute bottom-8 left-8 bg-white/90 p-4">
                    <h2 className=' text-2xl font-bold text-gray-900 mb-3'>
                        Traditional Locks</h2>
                        <Link to="/Types/all?Locks=Traditional">Shop Now</Link>
                </div>
            </div> 
        
        {/* Smart Lock */}
        <div className="relative flex-1">
                <img src={SmartLocks} alt="Smart Locks" className='w-full h-[700px] object-cover'/>
                <div className="absolute bottom-8 left-8 bg-white/90 p-4">
                    <h2 className=' text-2xl font-bold text-gray-900 mb-3'>
                        Smart Locks</h2>
                        <Link to="/Types/all?Locks=Smart">Shop Now</Link>
                </div>
            </div>
            {/* specialized locks */}
            <div className="relative flex-1">
                <img src={SpecializedLocks} alt="specialized Locks" className='w-full h-[700px] object-cover'/>
                <div className="absolute bottom-8 left-8 bg-white/90 p-4">
                    <h2 className=' text-2xl font-bold text-gray-900 mb-3'>
                        Specialized Locks</h2>
                        <Link to="/Types/all?Locks=Specialized">Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TypesOfLocks