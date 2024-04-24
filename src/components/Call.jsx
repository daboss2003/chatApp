import React from 'react'
import { IoLink } from 'react-icons/io5'
import { MdAddCall } from 'react-icons/md'

function Call() {
  return (
      <div className='w-screen relative px-3 pt-2 overflow-x-hidden overflow-y-auto max-h-[76vh] h-[76vh] pb-8'>
          <div className='flex items-center gap-2 p-3 hover:bg-gray-200'>
              <button className='bg-colorTeal p-4 text-light rounded-full cursor-pointer'><IoLink size={20} /></button>
              <div className='flex flex-col gap-1'>
                  <h2 className='font-medium text-xl'>Create call link</h2>
                  <p>Share a link for your WhatsApp call</p>
              </div>
          </div>
          <h2 className='m-3'>Recent</h2>
      <div className='absolute right-3 bottom-6'>
        <button className='p-3 bg-colorTeal text-light rounded-lg cursor-pointer'><MdAddCall size={20} /></button>
      </div>
    </div>
  )
}

export default Call
