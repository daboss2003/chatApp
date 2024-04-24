import React, { useContext } from 'react'
import { FaCamera, FaPlus } from 'react-icons/fa'
import { MdChevronRight, MdEdit } from 'react-icons/md'
import { userContext, AllUsersContext } from '../context/context'
import UsersCircle from './UsersCircle'
import UserFollow from './UserFollow'
import message from '/img/message.png'
import mark from '/img/mark.jpg'
import { CiMenuKebab } from 'react-icons/ci'

function Updates() {
    const user = useContext(userContext);
    const Allusers = useContext(AllUsersContext);
    const filtered = Allusers.filter(item => item.id !== user.id)
  return (
      <div className='w-screen py-2 px-2 overflow-x-hidden overflow-y-auto max-h-[76vh] pb-16'>
          <div className='flex justify-between items-center pb-3'>
              <h2 className='font-bold text-lg'>Status</h2>
              <div className='dropdown'>
                  <button className='text-dark'><CiMenuKebab size={25} /></button>
                  <div>
                      <li>see all statuses</li>
                      <li>Status privacy</li>
                      <li>Status archive settings</li>
                  </div>
              </div>
          </div>
          <div className='py-3 overflow-hidden border-b px-1'>
              <div className='flex items-center overflow-y-hidden overflow-x-auto gap-2'>
                  <div className='flex flex-col gap-1 relative cursor-grab items-center px-2'>
                      <figure><img src={user.imageUrl} alt="" className='w-[50px] h-[50px] rounded-full' /></figure>
                      <button className='p-1 bg-blueColor text-light absolute flex items-center justify-center top-[40%] right-2  rounded-full'><FaPlus size={12} /></button>
                      <figcaption className='text-sm text-nowrap'>My status</figcaption>
                  </div>
                  {filtered.map(item => <UsersCircle key={item.id} user={item} />)}
              </div>
          </div>

          <div className='flex items-center justify-between py-3 '>
              <h2 className='font-bold text-lg'>Channels</h2>
              <button className='p-3'><FaPlus size={18} /></button>
          </div>
          <div className='flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer w-full'>
                <figure><img src={mark} alt="" className='w-[60px] h-[60px] rounded-full' /></figure>
                <div className='flex flex-col gap-1'>
                    <h2 className='flex items-center justify-between'>Mark Zuckerberg<span className='inline-block'>4/19/24</span></h2>
                    <p>its pretty wild. Excited to see the image on my...</p>
                </div>
          </div>
          <div className='flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer w-full'>
                <figure><img src={message} alt="" className='w-[60px] h-[60px] rounded-full' /></figure>
                <div className='flex flex-col gap-1'>
                    <h2 className='flex items-center justify-between'>WhatsApp<span className='inline-block'>4/19/24</span></h2>
                    <p>Channel Crush: RuPauls Dragon on dragon ball...</p>
                </div>
            </div>
          <div className='flex items-center justify-between py-3'>
              <h2 className='font-bold text-lg'>Find channels</h2>
              <button className='px-4 flex items-center justify-center gap-2'>See all <MdChevronRight size={20} /></button>
          </div>
          <div className='py-3 overflow-hidden'>
              <div className='flex items-center overflow-y-hidden overflow-x-auto gap-3'>
                {filtered.map(item => <UserFollow key={item.id} user={item} />)}
              </div>
          </div>

        <div className='absolute right-3 bottom-3 flex flex-col gap-3 items-center'>
            <button className='p-2 rounded-md bg-blue-100 text-colorTeal'><MdEdit size={23} /></button>
            <button className='p-4 bg-colorTeal text-light rounded-lg cursor-pointer'><FaCamera size={23} /></button>
        </div>
    </div>
  )
}

export default Updates
