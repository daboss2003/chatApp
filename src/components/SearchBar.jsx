import React from 'react'
import { LiaSearchSolid } from "react-icons/lia";

function SearchBar({placeholder, searchInput, handleSearchInput}) {
  return (
      <div className='md:w-full mx-auto my-3 overflow-hidden w-[90%]'>
          <div className='flex rounded-md shadow-lg relative after:absolute after:w-[98%] after:left-1  w-full after:h-[3px] after:bg-blueColor after:-bottom-[2px] py-[2px]  bg-light dark:bg-darkLight'>   
            <button className='basis-[8%] flex items-center justify-center text-darkLight dark:text-blueColor bg-light dark:bg-darkLight'><LiaSearchSolid size={16} /></button>
            <input type="text" className='flex-1 outline-none border-none placeholder:text-sm text-darkLight dark:text-white bg-light dark:bg-darkLight ' placeholder={placeholder} value={searchInput} onChange={handleSearchInput} />
          </div>
    </div>
  )
}

export default SearchBar
