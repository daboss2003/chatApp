import React from 'react'
import { padNames } from '../assets/filter';

function UsersCircle({ user }) {
    const { imageUrl, username } = user;
  return (
    <div className='flex flex-col gap-1 relative cursor-grab px-2'>
        <figure><img src={imageUrl} alt="" className='w-[50px] h-[50px] rounded-full bg-gray-100' /></figure>
        <figcaption className='tet-sm'>{padNames(username, 10)}</figcaption>
    </div>
  )
}

export default UsersCircle
