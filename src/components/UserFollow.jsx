import React from 'react'
import { padNames } from '../assets/filter';
import { BsPatchCheckFill } from 'react-icons/bs';

function UserFollow({ user }) {
    const { username, imageUrl } = user;
  return (
    <div className='p-3 border shadow-md rounded-lg flex flex-col items-center gap-4 min-w-[150px] relative'>
        <figure><img src={imageUrl} alt="" className='w-[50px] h-[50px] rounded-full bg-gray-100' /></figure>
          <p>{padNames(username, 18)}</p>
          <button className='bg-gray-200 p-[2px] text-blueColor rounded-full absolute right-[35%] top-[30%]'><BsPatchCheckFill size={18} /></button>
          <button className='px-3 py-1 bg-gray-300 hover:bg-blueColor text-light duration-300 ease-in-out rounded-lg w-full font-bold'>Follow</button>
    </div>
  )
}

export default UserFollow
