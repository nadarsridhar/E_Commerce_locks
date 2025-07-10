// import React from 'react'
// import { useSearchParams } from 'react-router-dom'


// const SortOptions = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const handleSortChange = (e) => {
//     const sortBy = e.target.value;
//     searchParams.set("sortBy",sortBy)
//     setSearchParams (searchParams)
//   }
//   return (
//     <div className='mb-4 flex items-center justify-end'>
//       <select id="sort"
//       onChange={handleSortChange}
//       value={searchParams.get("sortBy") || ""}
//       className='border p-2 rounded-md focus:outline-none'>
//         <option value="">Default</option>
//         <option value="priceAsc">Price : low to high</option>
//         <option value="priceDesc">Price : high to low</option>
//       </select>
//     </div>
//   )
// }

// export default SortOptions
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy)
    setSearchParams(searchParams)
  }

  return (
    <div className='mb-6 flex items-center justify-end'>
      <select 
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className='border-2 border-gray-300 bg-gradient-to-r from-gray-200 to-gray-600 text-black p-3 rounded-md focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-gray-500 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-200'>
        <option className='text-black' value="">Default</option>
        <option className='text-black' value="priceAsc">Price: Low to High</option>
        <option className='text-black' value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  )
}

export default SortOptions
